export function MutationOptions(options) {
  this.options = options;

  this.testMatch = (props) => {
    const requiredKeys = Object.keys(this.options).filter(
      (key) => this.options[key].trim
    );
    for (let i = 0; i < requiredKeys.length; i++) {
      if (!props[requiredKeys[i]].value.trim()) {
        return false;
      }
    }
    return true;
  };

  this.formatVars = (props) => {
    const variables = {};

    Object.keys(this.options).forEach((key) => {
      variables[key] = this.options[key].trim
        ? props[key].value.trim()
        : props[key].value;
    });
    return variables;
  };

  this.nullyfy = () => {
    const nullOptions = {};
    Object.keys(this.options).forEach((key) => (nullOptions[key] = ""));
    return nullOptions;
  };

  this.parseProps = (resource) => {
    const props = { ...this.options };
    Object.keys(this.options).forEach(
      (key) => (props[key].value = resource[key])
    );
    props.tags.value = props.tags.value.map((x) => x.name).join(",");
    return props;
  };
}
