import { StylesConfig } from "react-select";

export const selectStyles: StylesConfig<any> = {
  control: (base) => ({
    ...base,
    backgroundColor: "var(--background)",
    borderColor: "var(--color-border)",
    color: "var(--foreground)",
    minHeight: "42px",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--background)",
    zIndex: 50,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "var(--color-surface)"
      : "var(--background)",
    color: "var(--foreground)",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--foreground)",
  }),
  input: (base) => ({
    ...base,
    color: "var(--foreground)",
  }),
};
