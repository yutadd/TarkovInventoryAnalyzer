interface Window {
    API: {
      getClipboardText: () => Promise<any>;
      getLocalText: (filepass: string) => Promise<string>;
    };
  }