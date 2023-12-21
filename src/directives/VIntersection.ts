export default {
  mounted(el: Element, binding: any) {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const handleIntersect = (entries: any[], _: any) => {
      if (entries[0].isIntersecting) {
        binding.value();
      }
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(el);
  },
  name: "intersection",
};
