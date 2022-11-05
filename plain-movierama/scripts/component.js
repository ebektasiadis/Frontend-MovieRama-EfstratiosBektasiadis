const componentFactory = (selector) => {
  let fields, ref;
  const template = document.querySelector(`template#${selector}`);
  if (!template) return false;

  ref = createElementFromTemplate(template);
  fields = getDataFieldElements(ref);

  return {
    fields,
    ref,
  };
};
