import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="min-h-screen flex items-center justify-center bg-cream">
      <Container className="text-center">
        <h1 className="text-8xl font-bold text-text/20 mb-4">{t("code")}</h1>
        <h2 className="text-3xl font-bold text-text mb-4">{t("title")}</h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">{t("description")}</p>
        <Button href="/" variant="primary">{t("backHome")}</Button>
      </Container>
    </section>
  );
}
