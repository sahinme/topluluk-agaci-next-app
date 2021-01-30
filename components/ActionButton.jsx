import React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import {
  joinCommunityRequest,
  leaveCommunityRequest,
} from "../lib/users/actions";
import { useRouter } from "next/router";

function ActionButton(props) {
  const router = useRouter();
  const { isJoined, joinCommunity, leaveCommunity, slug, isLogged } = props;
  if (!isLogged) {
    return (
      <Button
        className="join_button"
        variant="contained"
        color="primary"
        onClick={() => router.push("/giris-yap")}
      >
        <span>Katıl</span>
      </Button>
    );
  } else {
    return (
      <Button
        className={isJoined ? "join_button_checked" : "join_button"}
        variant="contained"
        color={isJoined ? "default" : "primary"}
        onClick={
          isJoined
            ? () => leaveCommunity({ slug })
            : () => joinCommunity({ slug })
        }
      >
        <span>{isJoined ? "Üyesin" : "Katıl"}</span>
      </Button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  joinCommunity: (payload) => dispatch(joinCommunityRequest(payload)),
  leaveCommunity: (payload) => dispatch(leaveCommunityRequest(payload)),
});

const mapStateToProps = (state) => ({
  community: state.community.data,
  //auth: state.auth.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionButton);
