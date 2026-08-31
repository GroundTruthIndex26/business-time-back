/** Renders the Block[] structures declared in content/site.ts. */
import {
  Block,
  ContentPage as ContentPageData,
  PageMeta as Meta,
} from "@/content/site";
import { Rich, SmartLink } from "@/components/Rich";
import { SiteLayout } from "@/layouts/SiteLayout";

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "lead":
      return (
        <p className="lead">
          <Rich text={block.text} />
        </p>
      );
    case "p":
      return (
        <p>
          <Rich text={block.text} />
        </p>
      );
    case "ul":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>
              <Rich text={item} />
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <div className="steps">
          {block.items.map(step => (
            <div className="s" key={step.title}>
              <h3>{step.title}</h3>
              <p>
                <Rich text={step.body} />
              </p>
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <div className="twrap">
          <table>
            <thead>
              <tr>
                {block.head.map((cell, i) => (
                  <th key={i}>
                    {cell.split("\n").map((line, j) => (
                      <span key={j}>
                        {j > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "faq":
      return (
        <div className="faq">
          {block.items.map(item => (
            <details key={item.q} open={item.open}>
              <summary>{item.q}</summary>
              <div className="a">
                <Rich text={item.a} />
              </div>
            </details>
          ))}
        </div>
      );
    case "cta":
      return (
        <div className="cta">
          <SmartLink href={block.href} className="btn">
            {block.label}
          </SmartLink>
        </div>
      );
  }
}

export function ContentPage({
  page,
  meta,
}: {
  page: ContentPageData;
  meta: Meta;
}) {
  return (
    <SiteLayout meta={meta} crumb={page.crumb}>
      <h1>{page.h1}</h1>
      {page.blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </SiteLayout>
  );
}
