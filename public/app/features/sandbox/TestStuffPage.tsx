/* eslint-disable @grafana/i18n/no-untranslated-strings */
import { useState } from 'react';

import { PageLayoutType, type NavModelItem } from '@grafana/data';
import { usePluginLinks } from '@grafana/runtime';
import { Button, LinkButton, RadioButtonGroup, Stack, Text } from '@grafana/ui';
import { Page } from 'app/core/components/Page/Page';
import { useAppNotification } from 'app/core/copy/appNotification';

const layoutOptions = Object.entries(PageLayoutType)
  .filter((entry): entry is [string, PageLayoutType] => typeof entry[0] === 'string' && typeof entry[1] === 'number')
  .map(([label, value]) => ({ label, value }));

export const TestStuffPage = () => {
  const node: NavModelItem = {
    id: 'test-page',
    text: 'Test page',
    icon: 'dashboard',
    subTitle: 'FOR TESTING!',
    url: 'sandbox/test',
  };

  const notifyApp = useAppNotification();
  const [layout, setLayout] = useState(PageLayoutType.Standard);

  return (
    <Page layout={layout} navModel={{ node: node, main: node }}>
      <LinkToBasicApp extensionPointId="grafana/sandbox/testing" />

      <Text variant="h5">Application notifications (toasts) testing</Text>
      <Stack>
        <Button onClick={() => notifyApp.success('Success toast', 'some more text goes here')} variant="primary">
          Success
        </Button>
        <Button
          onClick={() => notifyApp.warning('Warning toast', 'some more text goes here', 'bogus-trace-99999')}
          variant="secondary"
        >
          Warning
        </Button>
        <Button
          onClick={() => notifyApp.error('Error toast', 'some more text goes here', 'bogus-trace-fdsfdfsfds')}
          variant="destructive"
        >
          Error
        </Button>
      </Stack>

      <Text variant="h5">Page layout testing</Text>
      <Stack>
        <RadioButtonGroup options={layoutOptions} value={layout} onChange={setLayout} />
      </Stack>
    </Page>
  );
};

function LinkToBasicApp({ extensionPointId }: { extensionPointId: string }) {
  const { links } = usePluginLinks({ extensionPointId });

  if (links.length === 0) {
    return null;
  }

  return (
    <div>
      {links.map((link, i) => {
        return (
          <LinkButton href={link.path} title={link.description} key={link.id}>
            {link.title}
          </LinkButton>
        );
      })}
    </div>
  );
}

export default TestStuffPage;
