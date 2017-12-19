type Props = { children: React.ReactElement<any> | null }

/** simple helper component to render stuff without a wrapper element */
export const Fragment: React.StatelessComponent = (props: Props) => props.children
