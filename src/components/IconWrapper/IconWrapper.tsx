const IconWrapper = ({
  children,
  onClick,
  loading,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
}) => (
  <div
    className={`border rounded-2xl p-4 iconShadow ${
      loading ? "cursor-not-allowed" : "cursor-pointer"
    }  `}
    onClick={onClick}
  >
    {children}
  </div>
);

export default IconWrapper;
