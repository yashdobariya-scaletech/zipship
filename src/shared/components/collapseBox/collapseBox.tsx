import { DownArrowIcon, PlusIcon } from '../icons/icon';

interface ICollapseBox extends React.PropsWithChildren {
  title: string;
  sectionExpand: string;
  setSectionExpand: (value: string) => void;
  isAddCustomField?: boolean;
  customFiledModalOpen?: () => void;
}

const CollapseBox: React.FC<ICollapseBox> = (props) => {
  const {
    sectionExpand,
    setSectionExpand,
    title,
    isAddCustomField,
    customFiledModalOpen,
  } = props;

  return (
    <>
      <div
        className="collapse-box-wrapper flex align-items--center justify-content--between pointer"
        onClick={() => setSectionExpand(sectionExpand !== title ? title : '')}
      >
        <p className="collapse-title font-size--24 line-height--32 font--bold text--uppercase">
          {title}
        </p>
        <div className="flex align-items--center">
          {isAddCustomField && (
            <button
              type="button"
              className="bg--transparent btn--border-primary flex align-items--center justify-content--center"
              onClick={(event: any) => {
                event.stopPropagation();
                customFiledModalOpen && customFiledModalOpen();
              }}
            >
              <PlusIcon className="icon" />
              Add Custom Field
            </button>
          )}
          <div
            className={`collapse-arrow bg--grey-100 flex align-items--center justify-content--center pointer transition ${
              sectionExpand === title ? 'expand' : ''
            }`}
          >
            <DownArrowIcon className="icon" />
          </div>
        </div>
      </div>
      {sectionExpand === title && props.children}
    </>
  );
};

export default CollapseBox;
