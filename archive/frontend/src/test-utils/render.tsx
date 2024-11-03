import {render as testingLibraryRender} from '@testing-library/react';
import {MantineProvider} from '@mantine/core';
import React from "react";

export const render = (ui: React.ReactNode) => {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({children}: { children: React.ReactNode }) => (
      <MantineProvider defaultColorScheme={'dark'}>
        {children}
      </MantineProvider>
    ),
  })
}