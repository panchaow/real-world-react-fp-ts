import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Profile } from "../types";

const EditProfileSettings = () => {
  return (
    <Link
      to="/settings"
      className="btn btn-sm btn-outline-secondary action-btn"
    >
      <i className="ion-gear-a"></i> Edit Profile Settings
    </Link>
  );
};

interface FollowUserButtonProps {
  user: Profile;
  onFollow?: () => void;
  onUnfollow?: () => void;
}

const FollowUserButton = (props: FollowUserButtonProps) => {
  let classes = "btn btn-sm action-btn";
  if (props.user.following) {
    classes += " btn-secondary";
  } else {
    classes += " btn-outline-secondary";
  }

  const handleClick = (ev: MouseEvent) => {
    ev.preventDefault();
    if (props.user.following) {
      props.onUnfollow?.();
    } else {
      props.onFollow?.();
    }
  };

  return (
    <button className={classes} onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp;
      {props.user.following ? "Unfollow" : "Follow"} {props.user.username}
    </button>
  );
};

export type UserInfoProps = {
  isUser: boolean;
  profile: Profile;
} & Pick<FollowUserButtonProps, "onFollow" | "onUnfollow">;

export const UserInfo = (props: UserInfoProps) => {
  const profile = props.profile;

  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img
              src={
                profile.image ||
                "https://static.productionready.io/images/smiley-cyrus.jpg"
              }
              className="user-img"
              alt={profile.username}
            />
            <h4>{profile.username}</h4>
            <p>{profile.bio}</p>
            {props.isUser ? (
              <EditProfileSettings />
            ) : (
              <FollowUserButton
                user={profile}
                onFollow={props.onFollow}
                onUnfollow={props.onUnfollow}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
