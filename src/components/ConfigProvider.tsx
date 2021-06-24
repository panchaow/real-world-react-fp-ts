import { createContext, useContext, PropsWithChildren } from 'react';

interface Config {
  appName: string;
}

const defaultConfig: Config = {
  appName: process.env.REACT_APP_NAME ?? "Conduit",
}

const configContext = createContext<Config>(defaultConfig);

type ConfigProviderProps = PropsWithChildren<{
  config: Config,
}>

export const ConfigProvider = (props: ConfigProviderProps) => {
  const parent = useContext(configContext);

  const config = Object.assign({}, parent, props.config)

  return (
    <configContext.Provider value={config}>
      {props.children}
    </configContext.Provider>
  )
}

export const useConfig = () => {
  return useContext(configContext);
}