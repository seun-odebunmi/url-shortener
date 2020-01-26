interface Theme {
  footerIsFixed: boolean;
  skinType: string;
  skinAccentColor: any;
  mainLogoUrl: string;
}

export interface ISettings {
  name: string;
  title: string;
  theme: Theme;
}
