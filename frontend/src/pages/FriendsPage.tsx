import React, { useState, useEffect, useContext, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  CircularProgress,
  Box
} from '@mui/material'
import { listFriends } from '../api/users'
import type { Profile } from '../api/users'
import { AuthContext } from '../contexts/AuthContext'

type Friend = Profile['friends'][0]

const FriendsPage: React.FC = () => {
  const renderCount = useRef(0)
  renderCount.current++

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const auth = useContext(AuthContext)!

  const [friends, setFriends] = useState<Friend[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth.token) {
      navigate('/login')
    }
  }, [auth.token, navigate])

  // Fetch friends list
  useEffect(() => {
    if (!id || !auth.token) return

    setLoading(true)
    setError(null)

    listFriends(id, auth.token)
      .then(({ data }) => {
        setFriends(data)
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          'Failed to load friends'
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id, auth.token])

  return (
    <Container 
      maxWidth="sm" 
      sx={{mt: 4}}
    >
      <Typography variant="h4" gutterBottom>
        {
          id === auth.userId ? 'Your Friends' : 'Friends'
        }
      </Typography>

      {loading && (
        <Box textAlign="center" sx={{ my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ my: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && friends.length === 0 && (
        <Typography sx={{ my: 2 }}>You have no friends yet.</Typography>
      )}

      <List
        sx={{ 
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        {friends.map((friend) => (
          <ListItem
            key={friend._id}
            secondaryAction={
              <Button
                size="small"
                onClick={() => navigate(`/profile/${friend._id}`)}
              >
                View
              </Button>
            }
          >
            <ListItemAvatar>
              <Avatar src={friend.profile.profilePicUrl}>
                {friend.profile.name?.[0] || friend.email[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={friend.profile.name}
              secondary={friend.email}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default FriendsPage
