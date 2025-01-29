import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import api from "../../../shared/services/api.ts";
import {Button, Card, Center, Loader, Select, Stack, Text, TextInput} from "@mantine/core";
import {DatePickerInput} from "@mantine/dates";
import {useAlert} from "../../../../Providers/AlertProvider.tsx";

export const MatchRegister = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birthdate: "",
  });
  const [useMeowHubData, setUseMeowHubData] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const alert = useAlert();

  useEffect(() => {
    // Check URL parameter
    const useMeowHub = searchParams.get("useMeowHubData") === "true";
    setUseMeowHubData(useMeowHub);

    // If useMeowHubData is true, automatically create the profile
    if (useMeowHub) {
      setLoading(true);
      api
        .post("/api/matching-profile/create")
        .then(() => {
          alert.showError({
            title: "Profile created",
            message: "Your profile with MeowHub data has been created successfully",
            level: "INFO",
            timestamp: new Date().toISOString(),
          });
          navigate("/matching"); // Redirect after success
        })
        .catch((error) => {
          console.error("Error using MeowHub data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchParams, navigate]);

  const handleSubmitForm = async () => {
    setLoading(true);
    try {
      // Send POST request with form data
      await api.post("/api/matching-profile/create", formData);
      navigate("/matching"); // Redirect after success
    } catch (error) {
      console.error("Error creating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    // Loader while processing
    return (
      <Center h="100vh">
        <Loader/>
      </Center>
    );
  }

  return (
    <Center h="100vh">
      <Card shadow="sm" padding="lg" radius="md" withBorder w="400px">
        <Text size="xl" fw={700} mb="md">
          Register Profile
        </Text>
        <Stack>
          {!useMeowHubData && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitForm();
              }}
            >
              <Stack>
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({...formData, name: e.target.value})
                  }
                />
                <Select
                  label="Gender"
                  placeholder="Select your gender"
                  data={[
                    {value: "male", label: "Male"},
                    {value: "female", label: "Female"},
                    {value: "other", label: "Other"},
                  ]}
                  required
                  value={formData.gender}
                  onChange={(value) =>
                    setFormData({...formData, gender: value ?? ""})
                  }
                />
                <DatePickerInput
                  label="Birthdate"
                  placeholder="Select your birthdate"
                  value={formData.birthdate ? new Date(formData.birthdate) : null}
                  onChange={(date) =>
                    setFormData({...formData, birthdate: date?.toISOString() ?? ""})
                  }
                  required
                />
                <Button type="submit">Create Profile</Button>
              </Stack>
            </form>
          )}
        </Stack>
      </Card>
    </Center>
  );
};
