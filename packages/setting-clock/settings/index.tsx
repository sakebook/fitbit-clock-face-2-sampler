function settingsComponent() {
    return (
        <Page>
            <Section
                title={<Text bold align="center">背景色を選択できます</Text>}>
                <ColorSelect
                    settingsKey="select_color"
                    centered={true}
                    colors={[
                        {color: 'tomato'},
                        {color: 'sandybrown'},
                        {color: 'gold'},
                        {color: 'aquamarine'},
                        {color: 'deepskyblue'},
                        {color: 'plum'}
                    ]}
                />
            </Section>
        </Page>
    );
}
registerSettingsPage(settingsComponent);
