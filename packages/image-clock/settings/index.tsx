function settingsComponent(props: SettingsComponentProps) {
  const screenWidth = props.settingsStorage.getItem("screenWidth");
  const screenHeight = props.settingsStorage.getItem("screenHeight");

  return (
    <Page>
      <Section
        title={
          <Text bold align="center">
            背景画像を選択できます
          </Text>
        }
      >
        <ImagePicker
          label="背景画像を選ぶ"
          sublabel="端末の中の画像を選択します"
          pickerTitle="画像を選択してください"
          pickerImageTitle="選択中の画像"
          pickerLabel="端末から選択する"
          settingsKey="select_image"
          imageWidth={screenWidth}
          imageHeight={screenHeight}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(settingsComponent);
