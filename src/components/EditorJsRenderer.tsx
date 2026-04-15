"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface Block {
  type: string;
  data: Record<string, unknown>;
}

interface EditorJs {
  blocks: Block[];
}

// ─────────────────────────────────────────────
// Animations
// ─────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SPRING = { type: "spring" as const, stiffness: 260, damping: 24 };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: SPRING },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
};

// ─────────────────────────────────────────────
// Block renderers
// ─────────────────────────────────────────────

function HeaderBlock({ data }: { data: Record<string, unknown> }) {
  const level = Math.min(Number(data.level) || 2, 6);
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const sizes: Record<number, string> = {
    1: "text-4xl md:text-5xl",
    2: "text-3xl md:text-4xl",
    3: "text-2xl md:text-3xl",
    4: "text-xl md:text-2xl",
    5: "text-lg md:text-xl",
    6: "text-base md:text-lg",
  };
  return (
    <motion.div variants={fadeLeft} className="flex items-start gap-3">
      <span className="mt-2 block h-5 w-0.5 shrink-0 rounded-full bg-blue-600" />
      <Tag
        className={`font-bold leading-tight text-zinc-900 ${sizes[level]}`}
        dangerouslySetInnerHTML={{ __html: String(data.text ?? "") }}
      />
    </motion.div>
  );
}

function ParagraphBlock({ data }: { data: Record<string, unknown> }) {
  return (
    <motion.p
      variants={fadeUp}
      className="leading-relaxed text-zinc-700"
      dangerouslySetInnerHTML={{ __html: String(data.text ?? "") }}
    />
  );
}

function getListText(it: unknown): string {
  if (typeof it === "string") return it;
  if (it && typeof it === "object" && "content" in it)
    return String((it as { content: unknown }).content);
  return String(it ?? "");
}

function ListBlock({ data }: { data: Record<string, unknown> }) {
  const items = (data.items as unknown[]) ?? [];
  const Tag = data.style === "ordered" ? "ol" : "ul";
  return (
    <motion.div variants={container}>
      <Tag
        className={`space-y-1 pl-5 text-gray-700 ${
          data.style === "ordered" ? "list-decimal" : "list-disc"
        }`}
      >
        {items.map((it, i) => (
          <motion.li
            key={i}
            variants={listItem}
            dangerouslySetInnerHTML={{ __html: getListText(it) }}
          />
        ))}
      </Tag>
    </motion.div>
  );
}

function ImageBlock({ data }: { data: Record<string, unknown> }) {
  const file = data.file as { url?: string } | undefined;
  const src = (data.url as string) || file?.url || "";
  if (!src) return null;

  const rawWidth  = (data.width  as string) || "";
  const rawHeight = (data.height as string) || "";
  const caption   = (data.caption as string) || "";
  const widthNum  = rawWidth  && /^\d+$/.test(rawWidth)  ? parseInt(rawWidth)  : 900;
  const heightNum = rawHeight && /^\d+$/.test(rawHeight) ? parseInt(rawHeight) : 500;

  return (
    <motion.figure variants={scaleIn} className="overflow-hidden rounded-xl border border-gray-200">
      <Image
        src={src}
        alt={caption}
        width={widthNum}
        height={heightNum}
        className="w-full object-cover"
      />
      {!!caption && (
        <figcaption className="px-3 py-2 text-center text-xs text-gray-400">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

function QuoteBlock({ data }: { data: Record<string, unknown> }) {
  return (
    <motion.blockquote
      variants={scaleIn}
      className="relative overflow-hidden rounded-lg border-l-4 border-blue-600 bg-blue-50 px-6 py-5"
    >
      <p
        className="text-lg italic leading-relaxed text-zinc-800"
        dangerouslySetInnerHTML={{ __html: String(data.text ?? "") }}
      />
      {!!data.caption && (
        <cite className="mt-2 block text-sm text-blue-600">
          — {String(data.caption)}
        </cite>
      )}
    </motion.blockquote>
  );
}

function DelimiterBlock() {
  return (
    <motion.div
      variants={scaleIn}
      className="flex items-center justify-center gap-2 py-4"
    >
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-1 w-1 rounded-full bg-blue-400 opacity-50" />
      ))}
    </motion.div>
  );
}

function WarningBlock({ data }: { data: Record<string, unknown> }) {
  return (
    <motion.div
      variants={scaleIn}
      className="flex gap-3 rounded-lg border border-yellow-300 bg-yellow-50 p-4"
    >
      <span className="text-xl">⚠️</span>
      <div>
        {!!data.title && (
          <p className="mb-1 font-semibold text-yellow-800">{String(data.title)}</p>
        )}
        <p
          className="text-sm text-yellow-700"
          dangerouslySetInnerHTML={{ __html: String(data.message ?? "") }}
        />
      </div>
    </motion.div>
  );
}

function RawBlock({ data }: { data: Record<string, unknown> }) {
  return (
    <motion.div
      variants={fadeUp}
      dangerouslySetInnerHTML={{ __html: String(data.html ?? "") }}
    />
  );
}

function TableBlock({ data }: { data: Record<string, unknown> }) {
  const content = (data.content as string[][]) ?? [];
  const hasHeadings = data.withHeadings as boolean;
  const [head, ...rows] = content;
  return (
    <motion.div
      variants={fadeUp}
      className="overflow-x-auto rounded-xl border border-gray-200"
    >
      <table className="min-w-full text-sm">
        {hasHeadings && head && (
          <thead className="bg-gray-50">
            <tr>
              {head.map((cell, i) => (
                <th
                  key={i}
                  className="border-b border-gray-200 px-4 py-2 text-left font-semibold text-blue-600"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {(hasHeadings ? rows : content).map((row, ri) => (
            <tr
              key={ri}
              className={`border-b border-gray-100 ${ri % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-2 text-zinc-700"
                  dangerouslySetInnerHTML={{ __html: cell }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

function CodeBlock({ data }: { data: Record<string, unknown> }) {
  return (
    <motion.pre
      variants={fadeUp}
      className="overflow-x-auto rounded-xl border border-gray-200 bg-gray-900 p-4 text-sm leading-relaxed text-gray-100"
    >
      <code>{String(data.code ?? "")}</code>
    </motion.pre>
  );
}

function ChecklistBlock({ data }: { data: Record<string, unknown> }) {
  const items = (data.items as { text: string; checked: boolean }[]) ?? [];
  return (
    <motion.div variants={container} className="space-y-2">
      {items.map((it, i) => (
        <motion.div key={i} variants={listItem} className="flex items-start gap-3">
          <span
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2"
            style={{
              background: it.checked ? "#2563eb" : "transparent",
              borderColor: it.checked ? "#2563eb" : "#d1d5db",
            }}
          >
            {it.checked && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4l3 3 5-6"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          <span
            className="text-sm leading-relaxed"
            style={{
              color: it.checked ? "#9ca3af" : "#374151",
              textDecoration: it.checked ? "line-through" : "none",
            }}
            dangerouslySetInnerHTML={{ __html: it.text }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

function EmbedBlock({ data }: { data: Record<string, unknown> }) {
  const embed = (data.embed as string) || (data.source as string) || "";
  const caption = (data.caption as string) || "";
  if (!embed) return null;
  return (
    <motion.figure
      variants={scaleIn}
      className="overflow-hidden rounded-xl border border-gray-200"
    >
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={embed}
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          title={caption || "Embedded content"}
        />
      </div>
      {!!caption && (
        <figcaption className="px-3 py-2 text-center text-xs text-gray-400">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

interface Props {
  content: string;
}

export default function EditorJsRenderer({ content }: Props) {
  let doc: EditorJs;
  try {
    doc = JSON.parse(content) as EditorJs;
  } catch {
    return (
      <div
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const vp = { once: true, margin: "-40px" } as const;

  return (
    <div className="space-y-6">
      {doc.blocks.map((block, i) => {
        switch (block.type) {
          case "header":
            return (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={vp}>
                <HeaderBlock data={block.data} />
              </motion.div>
            );
          case "paragraph":
            return (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={vp}>
                <ParagraphBlock data={block.data} />
              </motion.div>
            );
          case "list":
            return (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={vp}>
                <ListBlock data={block.data} />
              </motion.div>
            );
          case "image":
            return (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={vp}>
                <ImageBlock data={block.data} />
              </motion.div>
            );
          case "quote":
            return (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={vp}>
                <QuoteBlock data={block.data} />
              </motion.div>
            );
          case "delimiter":
            return (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={vp}>
                <DelimiterBlock />
              </motion.div>
            );
          case "warning":
            return (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={vp}>
                <WarningBlock data={block.data} />
              </motion.div>
            );
          case "raw":
            return (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={vp}>
                <RawBlock data={block.data} />
              </motion.div>
            );
          case "table":
            return (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={vp}>
                <TableBlock data={block.data} />
              </motion.div>
            );
          case "code":
            return (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={vp}>
                <CodeBlock data={block.data} />
              </motion.div>
            );
          case "checklist":
            return (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={vp}>
                <ChecklistBlock data={block.data} />
              </motion.div>
            );
          case "embed":
            return (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={vp}>
                <EmbedBlock data={block.data} />
              </motion.div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
