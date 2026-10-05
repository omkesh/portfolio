import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ recipientEmail, onSubmitSuccess, onSubmitError }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", text: "" });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      setStatus({ state: "error", text: t("contact.required") });
      return;
    }
    if (!EMAIL_RE.test(form.email)) {
      setStatus({ state: "error", text: t("contact.invalidEmail") });
      return;
    }

    setStatus({ state: "sending", text: t("contact.sending") });

    try {
      // mailto handoff — replace with Formspree/EmailJS/API for production
      const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
      onSubmitSuccess?.();
      setStatus({ state: "success", text: t("contact.success") });
      setForm({ name: "", email: "", message: "" });
    } catch {
      onSubmitError?.(new Error("send failed"));
      setStatus({ state: "error", text: t("contact.error") });
    }
  }

  return (
    <form className="glass-card flex flex-col gap-5 p-8" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold"
          style={{ color: "var(--text-muted)" }}>
          {t("contact.name")}
        </label>
        <input
          id="contact-name"
          type="text"
          value={form.name}
          onChange={update("name")}
          placeholder={t("contact.namePlaceholder")}
          required
          className="w-full rounded-xl border px-4 py-3 outline-none transition-shadow"
          style={{
            background: "rgba(0,0,0,0.2)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-semibold"
          style={{ color: "var(--text-muted)" }}>
          {t("contact.email")}
        </label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={update("email")}
          placeholder={t("contact.emailPlaceholder")}
          required
          className="w-full rounded-xl border px-4 py-3 outline-none transition-shadow"
          style={{
            background: "rgba(0,0,0,0.2)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold"
          style={{ color: "var(--text-muted)" }}>
          {t("contact.message")}
        </label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={update("message")}
          placeholder={t("contact.messagePlaceholder")}
          required
          rows={5}
          className="w-full resize-vertical rounded-xl border px-4 py-3 outline-none"
          style={{
            background: "rgba(0,0,0,0.2)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        />
      </div>

      <button type="submit" className="btn btn-primary justify-center" disabled={status.state === "sending"}>
        {status.state === "sending" ? t("contact.sending") : t("contact.send")}
        <span aria-hidden="true">→</span>
      </button>

      <p
        role="status"
        className="min-h-5 text-sm"
        style={{ color: status.state === "error" ? "var(--red)" : "var(--green)" }}
      >
        {status.text}
      </p>
    </form>
  );
}

ContactForm.propTypes = {
  recipientEmail: PropTypes.string.isRequired,
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
};
