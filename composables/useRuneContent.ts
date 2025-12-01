import runeContent from "~/runeportfoliocontent.json";

type RuneContent = typeof runeContent;

export const useRuneContent = () => {
  const { locale } = useI18n();
  const content = runeContent as RuneContent;

  const getLocalized = <T extends keyof RuneContent>(key: T) =>
    computed(() => {
      const lang = locale?.value || "da";
      const translations = (content as any).translations?.[lang] || {};
      return (translations[key] as RuneContent[T]) || content[key];
    });

  return {
    content,
    personal: getLocalized("personal"),
    headline: getLocalized("headline"),
    profile: getLocalized("profile"),
    skills: getLocalized("skills"),
    services: getLocalized("services"),
    experience: getLocalized("experience"),
    education: getLocalized("education"),
    projects: getLocalized("projects"),
    values_and_workstyle: getLocalized("values_and_workstyle"),
    contact_cta: getLocalized("contact_cta"),
    getPersonal: () => getLocalized("personal").value,
    getHeadline: () => getLocalized("headline").value,
    getProfile: () => getLocalized("profile").value,
    getSkills: () => getLocalized("skills").value,
    getServices: () => getLocalized("services").value,
    getExperience: () => getLocalized("experience").value,
    getEducation: () => getLocalized("education").value,
    getProjects: () => getLocalized("projects").value,
    getValuesAndWorkstyle: () => getLocalized("values_and_workstyle").value,
    getContactCta: () => getLocalized("contact_cta").value,
  };
};
