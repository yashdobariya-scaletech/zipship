interface IProps {
  className?: string;
  onClick?: () => void;
}

export const DownArrowIcon: React.FC<IProps> = (props) => (
  <svg viewBox="0 0 22 22" fill="none" className={props.className || ''}>
    <path
      d="M3.66666 8.25L11 15.5833L18.3333 8.25"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PlusIcon: React.FC<IProps> = (props) => (
  <svg viewBox="0 0 16 16" className={props.className || ''}>
    <path
      d="M7.99963 14.4758V7.99963M7.99963 7.99963V1.52344M7.99963 7.99963H14.4758M7.99963 7.99963H1.52344"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
