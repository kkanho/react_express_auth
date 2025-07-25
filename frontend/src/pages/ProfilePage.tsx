import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import { getProfile, addFriend } from "../api/users";
import type { Profile } from "../api/users";
import { AuthContext } from "../contexts/AuthContext";

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = useContext(AuthContext)!;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isFriend, setIsFriend] = useState(false);
  const [adding, setAdding] = useState(false);
  const [friendError, setFriendError] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
    }
    if (!id) {
      setError("No user ID provided");
      setLoading(false);
    }
  }, [auth.token, id, navigate]);

  // Fetch the viewed user's profile
  useEffect(() => {
    if (!id || !auth.token) return;

    setLoading(true);
    getProfile(id, auth.token)
      .then(({ data }) => {
        setProfile(data);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load profile or user not found");
      })
      .finally(() => setLoading(false));
  }, [id, auth.token]);

  // Check if current user already added this profile
  useEffect(() => {
    if (!id || !auth.userId || !auth.token) return;
    if (id === auth.userId) return;

    getProfile(auth.userId, auth.token)
      .then(({ data }) => {
        const friendIds = data.friends as unknown as string[];
        setIsFriend(friendIds.includes(id));
      })
      .catch((e: unknown) => {
        console.log(e);
      });
  }, [id, auth.userId, auth.token]);

  const handleAddFriend = async () => {
    if (!id || !auth.token) return;

    setAdding(true);
    setFriendError(null);

    try {
      await addFriend(id, auth.token);
      setIsFriend(true);
    } catch (e: unknown) {
      console.log(e);
      setFriendError("Failed to add friend");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!profile) {
    return null;
  }

  const isOwn = profile._id === auth.userId;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Box sx={{ textAlign: "center", mb: 2 }}>
        {profile.profile.profilePicUrl ? (
          <Avatar
            src={profile.profile.profilePicUrl}
            sx={{ width: 100, height: 100, mx: "auto" }}
            slotProps={{
              img: {
                loading: "lazy",
              },
            }}
          />
        ) : (
          <Avatar
            sx={{ width: 100, height: 100, mx: "auto" }}
            slotProps={{
              img: {
                loading: "lazy",
              },
            }}
          >
            {profile.profile.name?.[0] || profile.email[0]}
          </Avatar>
        )}
      </Box>

      <Grid
        container
        spacing={1}
        alignItems="center"
        sx={{
          mb: 3,
          border: "1px solid #999999",
          borderRadius: 2,
          p: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Grid size={5}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
          >
            Name:
          </Typography>
        </Grid>
        <Grid size={7}>
          <Typography>{profile.profile.name}</Typography>
        </Grid>

        <Grid size={5}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
          >
            Email:
          </Typography>
        </Grid>
        <Grid size={7}>
          <Typography>{profile.email}</Typography>
        </Grid>

        <Grid size={5}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
          >
            Phone:
          </Typography>
        </Grid>
        <Grid size={7}>
          <Typography>
            {profile.profile.phone ? profile.profile.phone : "-"}
          </Typography>
        </Grid>

        <Grid size={5}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
          >
            Company:
          </Typography>
        </Grid>
        <Grid size={7}>
          <Typography>
            {profile.profile.company ? profile.profile.company : "-"}
          </Typography>
        </Grid>

        {profile._id === auth.userId && (
          <>
            <Grid size={5}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Friends:
              </Typography>
            </Grid>

            <Grid size={7}>
              <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                {profile.friends && profile.friends.length > 0 ? (
                  //     profile.friends.map((friend) => {
                  //   return (
                  //       <span key={friend._id}>
                  //           {friend.profile.name}{" "}
                  //           <Avatar
                  //               src={friend.profile.profilePicUrl}
                  //               sx={{ width: 24, height: 24, verticalAlign: "middle" }}
                  //           />
                  //       </span>
                  //   );
                  // })
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/friends/${profile._id}`)}
                  >
                    Show all friends
                  </Button>
                ) : (
                  "No friends yet"
                )}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>

      {!isOwn && (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="outlined"
            onClick={handleAddFriend}
            disabled={adding || isFriend}
          >
            {isFriend ? "Friends" : adding ? "Adding…" : "Add Friend"}
          </Button>

          {friendError && (
            <Typography color="error" sx={{ mt: 1 }}>
              {friendError}
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default ProfilePage;
