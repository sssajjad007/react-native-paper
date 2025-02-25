import * as React from 'react';

import { render } from '@testing-library/react-native';

import Provider from '../../../core/Provider';
import configureFonts from '../../../styles/fonts';
import { MD3LightTheme } from '../../../styles/themes';
import { tokens } from '../../../styles/themes/v3/tokens';
import Text, { customText } from '../../Typography/Text';

const content = 'Something rendered as a child content';

it('renders every variant of Text with children as content', () => {
  const variants = (
    <>
      <Text variant="displayLarge">{content}</Text>
      <Text variant="displayMedium">{content}</Text>
      <Text variant="displaySmall">{content}</Text>

      <Text variant="headlineLarge">{content}</Text>
      <Text variant="headlineMedium">{content}</Text>
      <Text variant="headlineSmall">{content}</Text>

      <Text variant="titleLarge">{content}</Text>
      <Text variant="titleMedium">{content}</Text>
      <Text variant="titleSmall">{content}</Text>

      <Text variant="bodyLarge">{content}</Text>
      <Text variant="bodyMedium">{content}</Text>
      <Text variant="bodySmall">{content}</Text>

      <Text variant="labelLarge">{content}</Text>
      <Text variant="labelMedium">{content}</Text>
      <Text variant="labelSmall">{content}</Text>
    </>
  );

  const tree = render(variants).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders v3 Text component without variant with default fontWeight and fontFamily', () => {
  const { getByTestId } = render(
    <Text testID="text-without-variant">{content}</Text>
  );
  const { brandRegular, weightRegular } = tokens.md.ref.typeface;

  expect(getByTestId('text-without-variant')).toHaveStyle({
    fontFamily: brandRegular,
    fontWeight: weightRegular,
  });
});

it('renders v3 Text component with custom variant correctly', () => {
  const fontConfig = {
    customVariant: {
      fontFamily: 'Montserrat-Regular',
      fontWeight: '400',
      letterSpacing: 0.51,
      lineHeight: 54.1,
      fontSize: 41,
    },
  } as const;

  const theme = {
    ...MD3LightTheme,
    fonts: configureFonts({ config: fontConfig }),
  };
  const Text = customText<'customVariant'>();
  const { getByTestId } = render(
    <Provider theme={theme}>
      <Text testID="text-with-custom-variant" variant="customVariant">
        {content}
      </Text>
    </Provider>
  );

  expect(getByTestId('text-with-custom-variant').props.style).toMatchSnapshot();
});

it('throws when custom variant not provided', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});

  const Text = customText<'myCustomVariant'>();
  expect(() =>
    render(<Text variant="myCustomVariant">{content}</Text>)
  ).toThrow(/myCustomVariant was not provided/);

  jest.clearAllMocks();
});
