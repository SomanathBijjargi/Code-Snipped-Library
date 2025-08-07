// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../services/apiService';
import SnippetCard from '../components/SnippetCard'; // Reuse the snippet card!
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setProfile(response.data);
      } catch (err) {
        setError('Failed to fetch profile. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!profile) return <p>Could not load profile.</p>;

  return (
    <div className="profile-container">
      <h2>{profile.username}'s Profile</h2>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Member since:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
      
      <hr style={{ margin: '2rem 0' }} />

      <h3>My Snippets ({profile.snippets.length})</h3>
      <div className="user-snippets-list">
        {profile.snippets.length > 0 ? (
          profile.snippets.map(snippet => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))
        ) : (
          <p>
            You haven't created any snippets yet. 
            <Link to="/create"> Add one now!</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
