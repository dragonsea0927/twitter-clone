export const EllipsisWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      aria-hidden={true}
      role="presentation"
      className="grid grid-flow-col"
    >
      {children}
    </div>
  );
};
