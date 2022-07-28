export const SafeHtmlWrapper = (props: { html: string, style?: React.CSSProperties }) => (
  <div style={props.style} dangerouslySetInnerHTML={{ __html: props.html }}></div>
);