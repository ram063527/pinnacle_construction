import { contact } from "@/data/contact";

export default function WhatsAppButton({ projectName }) {
  const message = projectName
    ? `Hi, I'm interested in ${projectName}`
    : contact.whatsappMessage;
  const href = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-7 w-7">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.653 4.526 1.786 6.393L3 29l7.812-2.735A11.94 11.94 0 0016.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.75c-1.955 0-3.79-.548-5.35-1.5l-.383-.228-4.635 1.622 1.55-4.516-.25-.393A9.71 9.71 0 016.25 15c0-5.38 4.374-9.75 9.754-9.75 5.38 0 9.746 4.37 9.746 9.75s-4.366 9.75-9.746 9.75zm5.35-7.302c-.293-.147-1.734-.856-2.003-.954-.269-.098-.465-.147-.66.147-.196.293-.758.954-.929 1.15-.171.196-.343.22-.636.073-.293-.147-1.238-.456-2.358-1.454-.872-.778-1.462-1.739-1.633-2.032-.171-.293-.018-.452.129-.598.132-.132.293-.343.44-.514.147-.171.196-.293.294-.489.098-.196.049-.367-.024-.514-.073-.147-.66-1.591-.905-2.18-.238-.573-.48-.495-.66-.504-.171-.008-.367-.01-.563-.01-.196 0-.514.073-.783.367-.269.293-1.026 1.002-1.026 2.443 0 1.44 1.05 2.833 1.196 3.03.147.196 2.067 3.157 5.008 4.428.7.302 1.246.482 1.672.617.702.223 1.341.191 1.847.116.563-.084 1.734-.708 1.979-1.392.245-.684.245-1.27.171-1.392-.073-.122-.269-.196-.563-.343z" />
      </svg>
    </a>
  );
}
