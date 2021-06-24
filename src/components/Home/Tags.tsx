import { useTags } from '../../hooks';

export interface PureTagsProps {
  tags?: string[];
  loading?: boolean;
  onClickTag?: (tag: string) => void;
}

export const PureTags = (props: PureTagsProps) => {
  const tags = props.tags;
  if (props.loading) {
    return <div>Loading Tags...</div>;
  }

  if (tags) {
    return (
      <div className="tag-list">
        {tags.map((tag) => {
          return (
            <button
              type="button"
              className="tag-default tag-pill"
              key={tag}
              onClick={(ev) => {
                ev.preventDefault();
                props.onClickTag?.(tag);
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>
    );
  } else {
    return <div>Nothing to show!</div>;
  }
};

export type TagsProps = Pick<PureTagsProps, "onClickTag">;

export const Tags = (props: TagsProps) => {
  const { tags, loading } = useTags();

  return (
    <PureTags loading={loading} tags={tags} onClickTag={props.onClickTag} />
  );
};
