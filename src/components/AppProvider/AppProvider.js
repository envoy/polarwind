import PropTypes from "prop-types";
import { EmbeddedContext } from "../../utils/embedded";
import { OriginContext } from "../../utils/origin";
import { ParentProvider } from "../ParentProvider";

/**
 * App provider is a required component that enables sharing global settings throughout the hierarchy of your application.
 */
export const AppProvider = ({
  children,
  embedded = true,
  origin = "https://dashboard.envoy.com",
}) => {
  return (
    <EmbeddedContext.Provider value={embedded}>
      <OriginContext.Provider value={origin}>
        <ParentProvider>{children}</ParentProvider>
      </OriginContext.Provider>
    </EmbeddedContext.Provider>
  );
};

AppProvider.propTypes = {
  /** Inner content of the application */
  children: PropTypes.node,
  /** Set whether running in embedded or standalone mode */
  embedded: PropTypes.bool,
  /** Envoy Dashboard origin */
  origin: PropTypes.string,
};
