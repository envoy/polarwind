import { useSelectState } from "@react-stately/select";

/**
 * A temporary fix to useSelectState not supporting falsey selectedKey.
 *
 * TODO: remove this when https://github.com/adobe/react-spectrum/pull/1015 is merged
 * upstream
 */
function usePatchedUseSelectState(props) {
  const { collection, selectedKey, ...rest } = useSelectState(props);

  const selectedItem =
    selectedKey != null ? collection.getItem(selectedKey) : null;

  return {
    ...rest,
    collection,
    selectedItem,
    selectedKey,
  };
}

export { usePatchedUseSelectState as useSelectState };
