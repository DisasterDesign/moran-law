interface WhatsAppFormData {
  name: string;
  phone: string;
  subject: string;
  description: string;
}

interface WhatsAppLabels {
  greeting: string;
  name: string;
  phone: string;
  subject: string;
  details: string;
}

export function buildWhatsAppUrl(
  number: string,
  data: WhatsAppFormData,
  labels: WhatsAppLabels
): string {
  const lines = [
    `${labels.name}: ${data.name}`,
    `${labels.phone}: ${data.phone}`,
    `${labels.subject}: ${data.subject}`,
  ];

  if (data.description.trim()) {
    lines.push(`${labels.details}: ${data.description}`);
  }

  const message = `${labels.greeting}\n${lines.join("\n")}`;
  return `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
}
