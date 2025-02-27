import {TypographyStylesProvider} from "@mantine/core";
import DOMPurify from 'dompurify';

export const InnerHtmlHandler = (props: { innerHtml: string }) => {

  //TODO: Define allowed tags and attributes for DOMPurify sanitizer
  // const allowedArgs = {
  //   ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'li', 'br'],
  //   ALLOWED_ATTR: ['href', 'title'],
  // }

  // Validate innerHtml to prevent XSS
  const sanitizedHtml = DOMPurify.sanitize(props.innerHtml);

  return (
    <TypographyStylesProvider>
      <div
        dangerouslySetInnerHTML={{__html: sanitizedHtml}}
      />
    </TypographyStylesProvider>
  );
}