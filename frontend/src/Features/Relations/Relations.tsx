import {useEffect, useState} from "react";
import {CenterContainer} from "../shared/components/CenterContainer";
import {Box, Card, Divider, Pagination, ScrollArea, Tabs, Title} from "@mantine/core";
import {IconArrowDownLeft, IconCircleX, IconSend} from "@tabler/icons-react";
import api from "../shared/services/api";
import {UserGrid} from "./components/UserGrid";
import {useAlert} from "../../Providers/AlertProvider.tsx";

export const Relations = () => {
  const [activeTab, setActiveTab] = useState<string | null>("sent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const alert = useAlert();

  const fetchData = async (page: number) => {
    setIsLoading(true);
    let endpoint = "";

    if (activeTab === "sent") {
      endpoint = `/api/relations/pending?page=${page - 1}`;
    } else if (activeTab === "received") {
      endpoint = `/api/relations/received?page=${page - 1}`;
    } else if (activeTab === "rejected") {
      endpoint = `/api/relations/rejected?page=${page - 1}`;
    }

    try {
      const response = await api.get(endpoint);
      setData(response.data?.content || []);
      setTotalPages(response.data?.totalPages || 0);
    } catch (error) {
      setData([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptRequest = (login: string) => {
    api.post(`/api/relations/${login}/accept`).then(r => {
      if (r.status === 200) {
        fetchData(currentPage).then(r => r);
        alert.showError(
          {
            title: 'Success',
            message: 'Friend request accepted',
            level: 'INFO',
            timestamp: new Date().toISOString()
          }
        );
      }
    });
  }

  const handleCancelRequest = (login: string) => {
    api.post(`/api/relations/${login}/reject`).then(r => {
      if (r.status === 200) {
        fetchData(currentPage).then(r => r);
        alert.showError(
          {
            title: 'Success',
            message: 'Friend request rejected',
            level: 'INFO',
            timestamp: new Date().toISOString()
          }
        );
      }
    });
  }

  // Fetch data when activeTab or currentPage changes
  useEffect(() => {
    fetchData(currentPage).then(r => r);
  }, [activeTab, currentPage]);

  return (
    <CenterContainer>
      <Card mih="90vh" w="50vw" component={ScrollArea}>

        <Box mah={totalPages > 1 ? 'calc(90dvh - 64px)' : ''}>
          <Title order={2}>Relations</Title>
          <Divider my="md"/>
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
          >
            <Tabs.List>
              <Tabs.Tab value="sent" leftSection={<IconSend/>}>
                Sent
              </Tabs.Tab>
              <Tabs.Tab value="received" leftSection={<IconArrowDownLeft/>}>
                Received
              </Tabs.Tab>
              <Tabs.Tab value="rejected" leftSection={<IconCircleX/>}>
                Rejected
              </Tabs.Tab>
            </Tabs.List>

            <Box mb={'xl'}>
              <Tabs.Panel value="sent">
                <UserGrid emptyMessage="No sent requests" sentRequests={data} isLoading={isLoading}/>
              </Tabs.Panel>
              <Tabs.Panel value="received">
                <UserGrid
                  emptyMessage="No received requests"
                  isReceived
                  sentRequests={data}
                  isLoading={isLoading}
                  handleAcceptRequest={handleAcceptRequest}
                  handleCancelRequest={handleCancelRequest}
                />
              </Tabs.Panel>
              <Tabs.Panel value="rejected">
                <UserGrid emptyMessage="No rejected requests" sentRequests={data} isLoading={isLoading}/>
              </Tabs.Panel>
            </Box>
          </Tabs>
        </Box>

        {totalPages > 1 &&
            <Box
                pos={'absolute'}
                bottom={0}
                left={0}
                right={0}
                py={'10px'}
                display={'flex'}
                style={{
                  zIndex: 10,
                  justifyContent: "center",
                }}
            >
                <Pagination total={totalPages} value={currentPage} onChange={setCurrentPage}/>
            </Box>
        }
      </Card>
    </CenterContainer>
  );
};
