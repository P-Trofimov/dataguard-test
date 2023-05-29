export type TabData = {
  title: string;
  icon: string;
  active: string[];
  disabled: string[];
  inactive: string[];
};

export type SidebarTab = {
  id: string;
  title: string;
  icon: string;
};

export type PluginData = {
  title: string;
  description: string;
};

export type PluginDataFull = PluginData & {
  active: boolean;
  disabled: boolean;
};
