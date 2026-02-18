
import React, { useState } from 'react';
import { SearchIcon, PencilSquareIcon, PlusIcon, LayersIcon } from '../components/icons/UiIcons';
import { InstagramIcon, TikTokIcon, YouTubeIcon } from '../components/icons/SocialIcons';
import UniversalSocialSearch from '../components/UniversalSocialSearch';
import InfluencerDetailPopup from '../components/InfluencerDetailPopup';

interface CampaignDetailViewProps {
  campaignName: string;
  onBack: () => void;
}

const CampaignDetailView: React.FC<CampaignDetailViewProps> = ({ campaignName, onBack }) => {
  const tabs = ['Profiles', 'List', 'Post', 'Insights'];
  const [activeTab, setActiveTab] = useState('Profiles');
  const [selectedInfluencer, setSelectedInfluencer] = useState<any | null>(null);
  const [showTagsPopup, setShowTagsPopup] = useState(false);
  const [campaignTags, setCampaignTags] = useState<string[]>(['Bartender', 'Coffee', 'Whisky']);
  const [newTagInput, setNewTagInput] = useState('');

  const [showAssignPopup, setShowAssignPopup] = useState<string | null>(null);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState<string | null>(null);
  const [removedInfluencers, setRemovedInfluencers] = useState<string[]>([]);

  // Discover Influencers popup
  const [showDiscoverPopup, setShowDiscoverPopup] = useState(false);
  const [discoverTab, setDiscoverTab] = useState<'Pro Collections' | 'Search Database' | 'Add from Campaigns'>('Search Database');
  const [discoverFilters, setDiscoverFilters] = useState({
    country: '',
    state: '',
    city: '',
    category: '',
    gender: '',
    hasEmail: false,
    channel: '',
    favourite: '',
    audienceFrom: '',
    audienceTo: '',
    mediaValueFrom: '',
    mediaValueTo: '',
  });
  const [discoverResults, setDiscoverResults] = useState<any[]>([]);
  const [discoverSearched, setDiscoverSearched] = useState(false);
  const [addedFromDiscover, setAddedFromDiscover] = useState<string[]>([]);
  const [dismissedFromDiscover, setDismissedFromDiscover] = useState<string[]>([]);
  const [discoverVisibleCount, setDiscoverVisibleCount] = useState(20);
  const [selectedCampaignSource, setSelectedCampaignSource] = useState<string | null>(null);
  const [expandedDiscoverUsername, setExpandedDiscoverUsername] = useState<string | null>(null);
  const [discoverExpandTab, setDiscoverExpandTab] = useState<'Key Stats' | 'Audience' | 'Content'>('Key Stats');
  const [discoverExpandPost, setDiscoverExpandPost] = useState<{ imageUrl: string; caption: string; likes: number; comments: number } | null>(null);
  const [selectedProCollection, setSelectedProCollection] = useState<string | null>(null);

  // Email batch send state
  const [emailToggles, setEmailToggles] = useState<Record<string, boolean>>({});
  const [connectedEmail, setConnectedEmail] = useState<'google' | 'outlook' | null>(null);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState<string | null>(null);
  const [showEmailTemplatePopup, setShowEmailTemplatePopup] = useState(false);
  const [showViewEmailPopup, setShowViewEmailPopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const emailTemplates = [
    { id: 'intro', name: 'Campaign Introduction', subject: 'Exciting Collaboration Opportunity!', preview: 'Hi {name}, we\'d love to partner with you on our upcoming campaign...' },
    { id: 'followup', name: 'Follow Up', subject: 'Following Up on Our Collaboration', preview: 'Hi {name}, just checking in on our previous message about...' },
    { id: 'offer', name: 'Partnership Offer', subject: 'Partnership Proposal – {campaign}', preview: 'Hi {name}, we have a fantastic opportunity for you to be part of...' },
    { id: 'brief', name: 'Campaign Brief', subject: 'Your Campaign Brief is Ready', preview: 'Hi {name}, thank you for joining! Here are the details for...' },
    { id: 'reminder', name: 'Content Reminder', subject: 'Friendly Reminder – Content Due Soon', preview: 'Hi {name}, just a gentle reminder that your content is due on...' },
  ];

  const toggledCount = Object.values(emailToggles).filter(Boolean).length;
  const canViewEmail = connectedEmail !== null && selectedEmailTemplate !== null;
  const canSendEmail = canViewEmail && toggledCount > 0;

  // Campaign posts data
  const campaignPosts = [
    {
      id: 'p1',
      influencer: 'Tully Smyth',
      username: 'tee_smyth',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
      thumbnailUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600',
      platform: 'instagram' as const,
      type: 'Post' as const,
      caption: 'So excited to share my new favourite recipe using @brandpartner ingredients! The flavours are absolutely incredible 🔥🍕 #Ad #CookingWithPassion',
      likes: 4827,
      comments: 312,
      impressions: 89400,
      mediaValue: 1560.42,
      postedAt: '2026-01-12',
    },
    {
      id: 'p2',
      influencer: 'Lauren Phillips',
      username: 'laurenphillips',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      thumbnailUrl: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=600',
      platform: 'instagram' as const,
      type: 'Post' as const,
      caption: 'Nothing beats a Sunday brunch spread like this 😍 Thanks @brandpartner for making my mornings so much better! #Sponsored',
      likes: 8213,
      comments: 547,
      impressions: 142800,
      mediaValue: 2491.92,
      postedAt: '2026-01-14',
    },
    {
      id: 'p3',
      influencer: 'Toasted Table',
      username: 'toastedtable',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400',
      thumbnailUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600',
      platform: 'instagram' as const,
      type: 'Reel' as const,
      caption: 'Watch me turn these simple ingredients into something MAGICAL ✨🧑‍🍳 Recipe in bio! #Ad #FoodTok #RecipeVideo',
      likes: 12450,
      comments: 893,
      impressions: 234600,
      mediaValue: 4094.34,
      postedAt: '2026-01-15',
    },
    {
      id: 'p4',
      influencer: 'Reynold',
      username: 'reynoldpoernomo',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      thumbnailUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600',
      platform: 'instagram' as const,
      type: 'Post' as const,
      caption: 'The art of dessert meets @brandpartner 🎨🍫 Creating something beautiful with the finest ingredients #Collaboration #PatisserieMagic',
      likes: 28940,
      comments: 1842,
      impressions: 487200,
      mediaValue: 8506.08,
      postedAt: '2026-01-16',
    },
    {
      id: 'p5',
      influencer: 'Reynold',
      username: 'reynoldpoernomo',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      thumbnailUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=600',
      platform: 'tiktok' as const,
      type: 'Reel' as const,
      caption: 'POV: You\'re watching a MasterChef finalist create pure chocolate magic 🍫✨ @brandpartner #FoodTok #DessertArt',
      likes: 45300,
      comments: 2156,
      impressions: 612800,
      mediaValue: 10700.00,
      postedAt: '2026-01-17',
    },
    {
      id: 'p6',
      influencer: 'Lauren Phillips',
      username: 'laurenphillips',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      thumbnailUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=600',
      platform: 'youtube' as const,
      type: 'Post' as const,
      caption: 'FULL DAY OF EATING with @brandpartner 🍽️ Breakfast to dinner, every meal was elevated! Link in bio for the full video 🎬',
      likes: 6840,
      comments: 428,
      impressions: 118400,
      mediaValue: 2067.12,
      postedAt: '2026-01-18',
    },
    {
      id: 'p7',
      influencer: 'Tully Smyth',
      username: 'tee_smyth',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
      thumbnailUrl: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=600',
      platform: 'tiktok' as const,
      type: 'Story' as const,
      caption: 'Quick story showing my morning routine with @brandpartner products 🌅☕ Swipe up for the full recipe!',
      likes: 3210,
      comments: 189,
      impressions: 67200,
      mediaValue: 1173.36,
      postedAt: '2026-01-19',
    },
    {
      id: 'p8',
      influencer: 'MELISSA HOYER OFFICIAL',
      username: 'melissahoyer',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      thumbnailUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600',
      platform: 'instagram' as const,
      type: 'Post' as const,
      caption: 'When style meets substance 💫 Loving this collaboration with @brandpartner — the attention to detail is everything #Lifestyle #Ad',
      likes: 2180,
      comments: 156,
      impressions: 41200,
      mediaValue: 719.34,
      postedAt: '2026-01-20',
    },
  ];

  // Computed post insights
  const totalPostImpressions = campaignPosts.reduce((sum, p) => sum + p.impressions, 0);
  const totalPostLikes = campaignPosts.reduce((sum, p) => sum + p.likes, 0);
  const totalPostComments = campaignPosts.reduce((sum, p) => sum + p.comments, 0);
  const totalPostMediaValue = campaignPosts.reduce((sum, p) => sum + p.mediaValue, 0);

  const allInfluencers = [
    {
      name: 'Tully Smyth',
      username: 'tee_smyth',
      imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
      category: 'Lifestyle Media',
      audience: '209,618',
      value: '3,657.84',
      location: 'Melbourne',
      region: 'AU',
      flag: '🇦🇺',
      email: 'youngbloodcreative@gmail.co',
      status: 'New',
      statusDate: 'Tue Jan 06 2026',
      platforms: ['instagram', 'youtube', 'tiktok'],
      platformStats: {
        instagram: { followers: '209,618', value: '$3,657.84' },
        youtube: { followers: '312,400', value: '$5,452.18' },
        tiktok: { followers: '137,847', value: '$2,404.63' },
      },
      posts: 0,
      stories: 0,
      isFavourite: false,
      isGeocoded: true,
      followers: '659,865',
      estimatedValue: '$11,514.65'
    },
    {
      name: 'Lauren Phillips',
      username: 'laurenphillips',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      category: 'Celebrity',
      audience: '134,621',
      value: '2,348.05',
      location: 'Melbourne',
      region: 'AU',
      state: 'Victoria',
      flag: '🇦🇺',
      email: 'Michelle.Tozer@img.com',
      status: 'New',
      statusDate: 'Fri Jul 04 2025',
      platforms: ['instagram', 'youtube'],
      platformStats: {
        instagram: { followers: '134,621', value: '$2,348.05' },
        youtube: { followers: '5,516,619', value: '$96,266.09' },
      },
      posts: 0,
      stories: 0,
      isFavourite: true,
      isGeocoded: true,
      followers: '5,651,240',
      estimatedValue: '$98,614.14'
    },
    {
      name: 'Toasted Table',
      username: 'toastedtable',
      imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400',
      category: 'Home Cooking',
      audience: '170,300',
      value: '2,971.07',
      location: 'Englewood Cliffs',
      region: 'US',
      state: 'New Jersey',
      flag: '🇺🇸',
      email: 'toastedtable@gmail.com',
      status: 'New',
      statusDate: 'Fri May 23 2025',
      platforms: ['instagram', 'tiktok'],
      platformStats: {
        instagram: { followers: '170,300', value: '$2,971.07' },
        tiktok: { followers: '68,400', value: '$1,193.58' },
      },
      posts: 0,
      stories: 0,
      isFavourite: false,
      isGeocoded: false,
      followers: '32,338',
      estimatedValue: '$564.30'
    },
    {
      name: 'Reynold',
      username: 'reynoldpoernomo',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      category: 'Food',
      audience: '1.3M',
      value: '22,946.72',
      location: 'Sydney',
      region: 'AU',
      state: 'New South Wales',
      flag: '🇦🇺',
      email: 'Hi@reynoldpoernomo.com.au',
      status: 'New',
      statusDate: 'Wed Jun 25 2025',
      platforms: ['instagram', 'youtube', 'tiktok'],
      platformStats: {
        instagram: { followers: '1,300,000', value: '$22,946.72' },
        youtube: { followers: '12,300', value: '$214.64' },
        tiktok: { followers: '1,624', value: '$28.34' },
      },
      posts: 0,
      stories: 0,
      isFavourite: true,
      isGeocoded: true,
      followers: '13,924',
      estimatedValue: '$242.98'
    },
    {
      name: 'MELISSA HOYER OFFICIAL',
      username: 'melissahoyer',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      category: 'Lifestyle Media',
      audience: '92.7K',
      value: '1,618.21',
      location: 'Sydney',
      region: 'AU',
      state: 'New South Wales',
      flag: '🇦🇺',
      email: '',
      status: 'New',
      statusDate: 'Mon May 19 2025',
      platforms: ['instagram'],
      platformStats: {
        instagram: { followers: '92,700', value: '$1,618.21' },
      },
      posts: 0,
      stories: 0,
      isFavourite: false,
      isGeocoded: false,
      followers: '29,277',
      estimatedValue: '$510.88'
    }
  ];

  const influencers = allInfluencers.filter(inf => !removedInfluencers.includes(inf.username));

  // Mock database of all influencers available for discovery
  const databaseInfluencers = [
    { name: 'Klay Copenhagen', username: 'klaycopenhagen', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', category: 'Ceramic Art', location: 'Jakarta', region: 'ID', state: 'Java', flag: '🇮🇩', followers: '29,277', estimatedValue: '$510.88', platforms: ['instagram'], gender: 'Male', hasEmail: true },
    { name: 'Sarah Chen', username: 'sarahchenofficial', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', category: 'Wellness Lifestyle', location: 'Sydney', region: 'AU', state: 'New South Wales', flag: '🇦🇺', followers: '412,890', estimatedValue: '$7,204.12', platforms: ['instagram', 'youtube'], gender: 'Female', hasEmail: true },
    { name: 'Marco Di Rossi', username: 'marcodirossi', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', category: 'Food', location: 'Melbourne', region: 'AU', state: 'Victoria', flag: '🇦🇺', followers: '87,340', estimatedValue: '$1,524.16', platforms: ['instagram', 'tiktok'], gender: 'Male', hasEmail: true },
    { name: 'Emma Whitfield', username: 'emmawhitfield', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', category: 'Celebrity', location: 'London', region: 'UK', state: 'England', flag: '🇬🇧', followers: '1,245,000', estimatedValue: '$21,730.50', platforms: ['instagram', 'youtube', 'tiktok'], gender: 'Female', hasEmail: false },
    { name: 'Jake Morrison', username: 'jakemorrison_', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', category: 'Home Cooking', location: 'Brisbane', region: 'AU', state: 'Queensland', flag: '🇦🇺', followers: '156,200', estimatedValue: '$2,725.89', platforms: ['instagram', 'youtube'], gender: 'Male', hasEmail: true },
    { name: 'Aisha Patel', username: 'aishapatel', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200', category: 'Lifestyle Media', location: 'New York', region: 'US', state: 'New York', flag: '🇺🇸', followers: '623,450', estimatedValue: '$10,882.12', platforms: ['instagram', 'tiktok'], gender: 'Female', hasEmail: true },
    { name: 'The Whiskey Tornado', username: 'thewhiskeytornado', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200', category: 'Food', location: 'Austin', region: 'US', state: 'Texas', flag: '🇺🇸', followers: '341,800', estimatedValue: '$5,965.42', platforms: ['instagram', 'youtube', 'tiktok'], gender: 'Male', hasEmail: true },
    { name: 'Nina Takahashi', username: 'ninatakahashi', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200', category: 'Wellness Lifestyle', location: 'Tokyo', region: 'JP', state: 'Kanto', flag: '🇯🇵', followers: '198,760', estimatedValue: '$3,468.27', platforms: ['instagram'], gender: 'Female', hasEmail: false },
    { name: 'Olivia Harper', username: 'oliviaharper', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', category: 'Lifestyle Media', location: 'Perth', region: 'AU', state: 'Western Australia', flag: '🇦🇺', followers: '95,420', estimatedValue: '$1,665.12', platforms: ['instagram', 'tiktok'], gender: 'Female', hasEmail: true },
    { name: 'Liam O\'Brien', username: 'liamobrienau', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', category: 'Food', location: 'Adelaide', region: 'AU', state: 'South Australia', flag: '🇦🇺', followers: '67,830', estimatedValue: '$1,183.74', platforms: ['instagram', 'youtube'], gender: 'Male', hasEmail: true },
    { name: 'Sophie Laurent', username: 'sophielaurent', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', category: 'Celebrity', location: 'Paris', region: 'FR', state: 'Île-de-France', flag: '🇫🇷', followers: '2,310,000', estimatedValue: '$40,320.00', platforms: ['instagram', 'youtube', 'tiktok'], gender: 'Female', hasEmail: false },
    { name: 'Tom Baxter', username: 'tombaxter_', imageUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=200', category: 'Home Cooking', location: 'Gold Coast', region: 'AU', state: 'Queensland', flag: '🇦🇺', followers: '44,210', estimatedValue: '$771.50', platforms: ['instagram'], gender: 'Male', hasEmail: true },
    { name: 'Mei Lin Wong', username: 'meilinwong', imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=200', category: 'Wellness Lifestyle', location: 'Singapore', region: 'SG', state: 'Central', flag: '🇸🇬', followers: '278,500', estimatedValue: '$4,861.25', platforms: ['instagram', 'youtube'], gender: 'Female', hasEmail: true },
    { name: 'Carlos Mendez', username: 'carlosmendez', imageUrl: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=200', category: 'Food', location: 'Los Angeles', region: 'US', state: 'California', flag: '🇺🇸', followers: '521,600', estimatedValue: '$9,102.88', platforms: ['instagram', 'tiktok'], gender: 'Male', hasEmail: true },
    { name: 'Ruby Anderson', username: 'rubyanderson', imageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=200', category: 'Lifestyle Media', location: 'Melbourne', region: 'AU', state: 'Victoria', flag: '🇦🇺', followers: '183,900', estimatedValue: '$3,210.06', platforms: ['instagram', 'tiktok'], gender: 'Female', hasEmail: true },
    { name: 'Ben Hartley', username: 'benhartley', imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200', category: 'Home Cooking', location: 'Sydney', region: 'AU', state: 'New South Wales', flag: '🇦🇺', followers: '112,450', estimatedValue: '$1,962.26', platforms: ['instagram', 'youtube'], gender: 'Male', hasEmail: true },
    { name: 'Priya Sharma', username: 'priyasharma', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200', category: 'Wellness Lifestyle', location: 'Mumbai', region: 'IN', state: 'Maharashtra', flag: '🇮🇳', followers: '890,200', estimatedValue: '$15,535.49', platforms: ['instagram', 'youtube', 'tiktok'], gender: 'Female', hasEmail: true },
    { name: 'Daniel Kim', username: 'danielkim_', imageUrl: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=200', category: 'Food', location: 'Seoul', region: 'KR', state: 'Gyeonggi', flag: '🇰🇷', followers: '445,300', estimatedValue: '$7,772.24', platforms: ['instagram', 'youtube'], gender: 'Male', hasEmail: false },
    { name: 'Hannah Brooks', username: 'hannahbrooks', imageUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&q=80&w=200', category: 'Celebrity', location: 'Sydney', region: 'AU', state: 'New South Wales', flag: '🇦🇺', followers: '765,100', estimatedValue: '$13,353.99', platforms: ['instagram', 'tiktok'], gender: 'Female', hasEmail: true },
    { name: 'Alex Turner', username: 'alexturner_chef', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200', category: 'Food', location: 'Melbourne', region: 'AU', state: 'Victoria', flag: '🇦🇺', followers: '203,700', estimatedValue: '$3,554.56', platforms: ['instagram', 'youtube', 'tiktok'], gender: 'Male', hasEmail: true },
    { name: 'Isabella Rossi', username: 'isabellarossi', imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200', category: 'Lifestyle Media', location: 'Rome', region: 'IT', state: 'Lazio', flag: '🇮🇹', followers: '334,600', estimatedValue: '$5,840.27', platforms: ['instagram', 'tiktok'], gender: 'Female', hasEmail: true },
    { name: 'Ryan Cooper', username: 'ryancooper', imageUrl: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&q=80&w=200', category: 'Home Cooking', location: 'Hobart', region: 'AU', state: 'Tasmania', flag: '🇦🇺', followers: '31,800', estimatedValue: '$555.03', platforms: ['instagram'], gender: 'Male', hasEmail: true },
    { name: 'Zoe Williams', username: 'zoewilliams', imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=200', category: 'Wellness Lifestyle', location: 'Byron Bay', region: 'AU', state: 'New South Wales', flag: '🇦🇺', followers: '267,900', estimatedValue: '$4,676.06', platforms: ['instagram', 'youtube'], gender: 'Female', hasEmail: true },
    { name: 'Chris Nguyen', username: 'chrisnguyen', imageUrl: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?auto=format&fit=crop&q=80&w=200', category: 'Food', location: 'Ho Chi Minh City', region: 'VN', state: 'South', flag: '🇻🇳', followers: '158,400', estimatedValue: '$2,764.24', platforms: ['instagram', 'tiktok'], gender: 'Male', hasEmail: true },
    { name: 'Amelia Foster', username: 'ameliafoster', imageUrl: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?auto=format&fit=crop&q=80&w=200', category: 'Celebrity', location: 'Brisbane', region: 'AU', state: 'Queensland', flag: '🇦🇺', followers: '543,200', estimatedValue: '$9,479.34', platforms: ['instagram', 'youtube', 'tiktok'], gender: 'Female', hasEmail: true },
    { name: 'Sam Mitchell', username: 'sammitchell', imageUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=200', category: 'Lifestyle Media', location: 'Canberra', region: 'AU', state: 'ACT', flag: '🇦🇺', followers: '52,100', estimatedValue: '$909.15', platforms: ['instagram'], gender: 'Male', hasEmail: false },
    { name: 'Lily Thompson', username: 'lilythompson', imageUrl: 'https://images.unsplash.com/photo-1519742866993-66d3cfef4bbd?auto=format&fit=crop&q=80&w=200', category: 'Food', location: 'Darwin', region: 'AU', state: 'Northern Territory', flag: '🇦🇺', followers: '38,750', estimatedValue: '$676.40', platforms: ['instagram', 'tiktok'], gender: 'Female', hasEmail: true },
    { name: 'Oscar James', username: 'oscarjames', imageUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=200', category: 'Home Cooking', location: 'Auckland', region: 'NZ', state: 'Auckland', flag: '🇳🇿', followers: '127,600', estimatedValue: '$2,226.72', platforms: ['instagram', 'youtube'], gender: 'Male', hasEmail: true },
    { name: 'Chloe Martin', username: 'chloemartin', imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', category: 'Wellness Lifestyle', location: 'Melbourne', region: 'AU', state: 'Victoria', flag: '🇦🇺', followers: '310,400', estimatedValue: '$5,415.98', platforms: ['instagram', 'youtube', 'tiktok'], gender: 'Female', hasEmail: true },
    { name: 'Ethan Wright', username: 'ethanwright', imageUrl: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&q=80&w=200', category: 'Food', location: 'Sydney', region: 'AU', state: 'New South Wales', flag: '🇦🇺', followers: '76,200', estimatedValue: '$1,330.09', platforms: ['instagram'], gender: 'Male', hasEmail: true },
  ];

  // Country code to name mapping for search matching
  const countryNames: Record<string, string> = { 'AU': 'Australia', 'US': 'United States', 'UK': 'United Kingdom', 'FR': 'France', 'ID': 'Indonesia', 'JP': 'Japan', 'SG': 'Singapore', 'IN': 'India', 'KR': 'South Korea', 'VN': 'Vietnam', 'IT': 'Italy', 'NZ': 'New Zealand' };

  const handleDiscoverSearch = () => {
    // Simple mock search — filters by matching fields if provided
    const results = databaseInfluencers.filter((inf) => {
      if (discoverFilters.country) {
        const query = discoverFilters.country.toLowerCase();
        const countryFullName = (countryNames[inf.region] || '').toLowerCase();
        const matchesRegion = inf.region.toLowerCase().includes(query);
        const matchesFullName = countryFullName.includes(query);
        const matchesFlag = inf.flag.includes(discoverFilters.country);
        if (!matchesRegion && !matchesFullName && !matchesFlag) return false;
      }
      if (discoverFilters.state && !inf.state.toLowerCase().includes(discoverFilters.state.toLowerCase())) return false;
      if (discoverFilters.city && !inf.location.toLowerCase().includes(discoverFilters.city.toLowerCase())) return false;
      if (discoverFilters.category && inf.category !== discoverFilters.category) return false;
      if (discoverFilters.gender && inf.gender !== discoverFilters.gender) return false;
      if (discoverFilters.hasEmail && !inf.hasEmail) return false;
      if (discoverFilters.channel && !inf.platforms.includes(discoverFilters.channel)) return false;
      return true;
    });
    setDiscoverResults(results);
    setDiscoverSearched(true);
    setDismissedFromDiscover([]);
    setDiscoverVisibleCount(20);
  };

  const handleAddInfluencerToCampaign = (username: string) => {
    setAddedFromDiscover([...addedFromDiscover, username]);
  };

  const handleDismissFromDiscover = (username: string) => {
    setDismissedFromDiscover([...dismissedFromDiscover, username]);
  };

  const handleToggleDiscoverExpand = (username: string) => {
    if (expandedDiscoverUsername === username) {
      setExpandedDiscoverUsername(null);
      setDiscoverExpandPost(null);
    } else {
      setExpandedDiscoverUsername(username);
      setDiscoverExpandTab('Key Stats');
      setDiscoverExpandPost(null);
    }
  };

  // Mock recent posts for discover influencer expanded view
  const discoverRecentPosts = [
    { imageUrl: 'https://picsum.photos/seed/disc-1/400/400', caption: 'Just wrapped up an incredible shoot with the team today. So grateful for these moments ✨', likes: 1842, comments: 67 },
    { imageUrl: 'https://picsum.photos/seed/disc-2/400/400', caption: 'New recipe alert! This one has been in development for weeks and it\'s finally ready 🍽️', likes: 3205, comments: 142 },
    { imageUrl: 'https://picsum.photos/seed/disc-3/400/400', caption: 'Golden hour in the city never gets old. Who else loves this time of day? 🌅', likes: 956, comments: 34 },
    { imageUrl: 'https://picsum.photos/seed/disc-4/400/400', caption: 'Behind the scenes content coming your way — this campaign is going to be something special 📸', likes: 2471, comments: 89 },
    { imageUrl: 'https://picsum.photos/seed/disc-5/400/400', caption: 'Weekend vibes with great company. Sometimes you just need to unplug and enjoy the moment ☀️', likes: 1567, comments: 52 },
    { imageUrl: 'https://picsum.photos/seed/disc-6/400/400', caption: 'Excited to announce our latest collaboration! Stay tuned for the full reveal next week 🔥', likes: 4120, comments: 198 },
  ];

  const availableCampaigns = [
    'Summer Wellness 2026',
    'Bartender Collective',
    'Healthy Living Q1',
    'Food & Bev Partnerships',
    'Travel Influencers AU',
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Breadcrumb / Back */}
      <button onClick={onBack} className="text-xs font-bold text-brand-gray hover:text-brand-accent flex items-center gap-1 uppercase tracking-widest">
        <span>←</span> Back to Campaigns
      </button>

      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">
            {campaignName} <span className="text-brand-gray opacity-40 font-sans font-bold text-2xl">(721)</span>
          </h1>
          <button className="p-2 text-brand-gray hover:text-brand-accent transition-colors">
            <PencilSquareIcon className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex items-center bg-white p-1 rounded-xl shadow-soft border border-gray-100 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 text-[11px] font-bold rounded-lg transition-all whitespace-nowrap ${
                tab === activeTab 
                  ? 'bg-black text-white shadow-md' 
                  : 'text-brand-gray hover:bg-gray-100 hover:text-brand-dark'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </nav>
      </div>

      {/* Action Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
        <div className="flex flex-col xl:flex-row items-stretch xl:items-end gap-8">
          <div className="flex items-center gap-2 shrink-0 h-[38px] xl:mb-0.5">
             <button className="bg-brand-accent text-white p-3 rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center">
                <SearchIcon className="w-4 h-4" />
             </button>
             <button className="border border-brand-light-gray p-3 rounded-xl text-brand-gray hover:bg-gray-50 transition-all flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
             </button>
          </div>
          <UniversalSocialSearch />
          <div className="shrink-0">
             <button
               onClick={() => setShowTagsPopup(true)}
               className="relative bg-white border border-gray-200 rounded-xl py-2.5 px-5 text-xs font-bold text-gray-700 hover:border-brand-accent hover:text-brand-accent transition-all h-[38px] flex items-center gap-2 xl:mb-0.5"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
               </svg>
               Tags
               {campaignTags.length > 0 && (
                 <span className="bg-brand-accent text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">{campaignTags.length}</span>
               )}
             </button>
          </div>
          <div className="flex-1" />
          <div className="shrink-0">
             <button
               onClick={() => { setShowDiscoverPopup(true); setDiscoverSearched(false); setDiscoverResults([]); setDiscoverFilters({ country: '', state: '', city: '', category: '', gender: '', hasEmail: false, channel: '', favourite: '', audienceFrom: '', audienceTo: '', mediaValueFrom: '', mediaValueTo: '' }); }}
               className="bg-brand-accent text-white font-black py-2.5 px-8 rounded-xl text-[10px] tracking-widest hover:brightness-110 transition-all shadow-md uppercase whitespace-nowrap h-[38px] flex items-center justify-center xl:mb-0.5"
             >
               Add Influencers
             </button>
          </div>
        </div>
      </div>

      {activeTab === 'Profiles' ? (
        /* Profiles Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {influencers.map((inf, idx) => (
            <div key={idx} className="cursor-pointer" onClick={() => setSelectedInfluencer(inf)}>
              <InfluencerProfileCard
                {...inf}
                onAssign={(username: string) => setShowAssignPopup(username)}
                onRemove={(username: string) => setShowRemoveConfirm(username)}
              />
            </div>
          ))}
        </div>
      ) : activeTab === 'List' ? (
        /* Compressed List View Table */
        <div className="space-y-4">
        {/* Email Batch Send Toolbar */}
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 px-5 py-3.5 flex flex-wrap items-center gap-3">
          {/* Connect Email */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setConnectedEmail(connectedEmail === 'google' ? null : 'google')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold transition-all border ${
                connectedEmail === 'google'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-brand-accent hover:text-brand-accent'
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {connectedEmail === 'google' ? 'Google Connected' : 'Sign in with Google'}
            </button>
            <button
              onClick={() => setConnectedEmail(connectedEmail === 'outlook' ? null : 'outlook')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold transition-all border ${
                connectedEmail === 'outlook'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-brand-accent hover:text-brand-accent'
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M21.17 2.06H10.94L0 6.71v10.52l10.94 4.65h10.23A1.84 1.84 0 0023 20.06V3.88a1.84 1.84 0 00-1.83-1.82z" fill="#0078D4"/>
                <path d="M10.94 2.06v19.82L0 17.23V6.71z" fill="#0364B8"/>
                <path d="M10.94 8.26L5.47 12l5.47 3.74V8.26z" fill="#0078D4" opacity=".5"/>
                <ellipse cx="5.47" cy="12" rx="3.5" ry="4" fill="white"/>
              </svg>
              {connectedEmail === 'outlook' ? 'Outlook Connected' : 'Connect Outlook'}
            </button>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200" />

          {/* Email Template */}
          <button
            onClick={() => setShowEmailTemplatePopup(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold transition-all border ${
              selectedEmailTemplate
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700 shadow-sm'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {selectedEmailTemplate
              ? emailTemplates.find(t => t.id === selectedEmailTemplate)?.name || 'Template Selected'
              : 'Email Template'}
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200" />

          {/* View Email */}
          <button
            onClick={() => { if (canViewEmail) setShowViewEmailPopup(true); }}
            disabled={!canViewEmail}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold transition-all border ${
              canViewEmail
                ? 'bg-white border-gray-200 text-gray-700 hover:border-brand-accent hover:text-brand-accent cursor-pointer'
                : 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            View Email
          </button>

          {/* Send Email */}
          <button
            disabled={!canSendEmail}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold transition-all border ${
              canSendEmail
                ? 'bg-brand-accent border-brand-accent text-white hover:brightness-110 shadow-sm cursor-pointer'
                : 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            Send Email
            {toggledCount > 0 && (
              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none ${
                canSendEmail ? 'bg-white/25 text-white' : 'bg-gray-200 text-gray-400'
              }`}>{toggledCount}</span>
            )}
          </button>

          {/* Spacer to push export to far right */}
          <div className="flex-1" />

          {/* Export CSV */}
          <button
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold text-brand-gray border border-gray-200 hover:border-brand-accent hover:text-brand-accent transition-all bg-white"
            title="Export to CSV"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            CSV
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-panel overflow-hidden border border-gray-100">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="bg-[#FDFCFB] border-b border-gray-100">
                <tr className="text-[10px] font-black text-brand-gray uppercase tracking-widest">
                  <th className="pl-5 pr-2 py-4 w-[60px]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[8px]">Send</span>
                      <button
                        onClick={() => {
                          const allOn = influencers.every(inf => emailToggles[inf.username]);
                          const newToggles: Record<string, boolean> = {};
                          influencers.forEach(inf => { newToggles[inf.username] = !allOn; });
                          setEmailToggles(newToggles);
                        }}
                        className={`w-8 h-[18px] rounded-full transition-all relative ${
                          influencers.every(inf => emailToggles[inf.username]) ? 'bg-brand-accent' : 'bg-gray-200'
                        }`}
                      >
                        <div className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-all ${
                          influencers.every(inf => emailToggles[inf.username]) ? 'left-[15px]' : 'left-[2px]'
                        }`} />
                      </button>
                    </div>
                  </th>
                  <th className="px-6 py-4 w-[240px]">Influencer</th>
                  <th className="px-6 py-4 w-[140px]">Audience & Value</th>
                  <th className="px-6 py-4 w-[160px]">Location</th>
                  <th className="px-6 py-4 w-[140px]">Category</th>
                  <th className="px-6 py-4 w-[140px]">Status</th>
                  <th className="px-6 py-4 text-right">Edit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {influencers.map((inf, idx) => (
                  <tr key={idx} className="group hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => setSelectedInfluencer(inf)}>
                    <td className="pl-5 pr-2 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center">
                        <button
                          onClick={() => setEmailToggles(prev => ({ ...prev, [inf.username]: !prev[inf.username] }))}
                          className={`w-9 h-[20px] rounded-full transition-all relative ${
                            emailToggles[inf.username] ? 'bg-brand-accent' : 'bg-gray-200'
                          }`}
                        >
                          <div className={`absolute top-[3px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-all ${
                            emailToggles[inf.username] ? 'left-[18px]' : 'left-[3px]'
                          }`} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                             <img src={inf.imageUrl} alt={inf.name} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[12px] font-bold text-brand-dark group-hover:text-brand-accent transition-colors truncate">{inf.name}</span>
                            <button
                              className={`${inf.isFavourite ? 'text-amber-400' : 'text-gray-200'} hover:text-amber-400 transition-colors flex-shrink-0`}
                              onClick={(e) => { e.stopPropagation(); /* toggle favourite logic here */ }}
                            >
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            </button>
                          </div>
                          <div className="flex gap-1">
                             <div className="bg-pink-100/40 text-pink-600 px-1 py-0.5 rounded text-[8px] font-black">P {inf.posts}</div>
                             <div className="bg-pink-100/40 text-pink-600 px-1 py-0.5 rounded text-[8px] font-black">S {inf.stories}</div>
                          </div>
                        </div>
                        <div className={`flex-shrink-0 ${inf.email ? 'text-emerald-500' : 'text-gray-300'}`} title={inf.email || 'No email'}>
                          {inf.email ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /></svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                           <span className="text-[12px] font-bold text-brand-dark">{inf.audience}</span>
                           <div className="w-3.5 h-3.5"><InstagramIcon /></div>
                        </div>
                        <div className="flex items-center gap-1.5">
                           <span className="text-[10px] font-black text-brand-accent">${inf.value}</span>
                           <div className="w-3 h-3 opacity-40"><InstagramIcon /></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-[11px] font-bold text-brand-dark truncate">{inf.location}{inf.state ? `, ${inf.state}` : ''}</span>
                        <div className="flex items-center gap-1.5">
                           <span className="text-sm leading-none">{inf.flag}</span>
                           <span className="text-[8px] font-black text-brand-gray uppercase">{inf.region}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-[11px] font-bold text-brand-dark truncate">{inf.category}</span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col gap-0.5">
                          <span className="text-[9px] font-black text-blue-600 uppercase bg-blue-50/50 px-2 py-0.5 rounded-md w-fit">{inf.status}</span>
                          <span className="text-[8px] text-brand-gray font-bold whitespace-nowrap">{inf.statusDate}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <select className="bg-white border border-gray-100 rounded-lg py-1 px-1.5 text-[9px] font-bold text-brand-dark outline-none cursor-pointer hover:border-brand-accent transition-all">
                             <option>Set Status</option>
                          </select>
                          <button className="p-1 text-brand-gray hover:text-brand-accent transition-colors"><PencilSquareIcon className="w-3.5 h-3.5" /></button>
                          <button className="p-1 text-brand-gray hover:text-red-500 transition-colors">
                             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      ) : activeTab === 'Post' ? (
        /* Post Grid View */
        <div className="space-y-5">
          {/* Insights Summary Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft px-5 py-4">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <span className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Impressions</span>
              </div>
              <p className="text-[22px] font-black text-brand-dark">{totalPostImpressions.toLocaleString()}</p>
              <p className="text-[10px] font-bold text-emerald-500 mt-0.5">+12.4% vs benchmark</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft px-5 py-4">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Total Likes</span>
              </div>
              <p className="text-[22px] font-black text-brand-dark">{totalPostLikes.toLocaleString()}</p>
              <p className="text-[10px] font-bold text-emerald-500 mt-0.5">{campaignPosts.length} posts</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft px-5 py-4">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Comments</span>
              </div>
              <p className="text-[22px] font-black text-brand-dark">{totalPostComments.toLocaleString()}</p>
              <p className="text-[10px] font-bold text-brand-gray mt-0.5">Avg {Math.round(totalPostComments / campaignPosts.length)} per post</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft px-5 py-4">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Media Value</span>
              </div>
              <p className="text-[22px] font-black text-brand-dark">${totalPostMediaValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p className="text-[10px] font-bold text-emerald-500 mt-0.5">+8.7% ROI</p>
            </div>
          </div>

          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {campaignPosts.map((post) => (
              <div key={post.id} onClick={() => setSelectedPost(post)} className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden hover:shadow-panel hover:-translate-y-0.5 transition-all group cursor-pointer">
                {/* Thumbnail */}
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={post.thumbnailUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {/* Platform badge */}
                  <div className="absolute top-3 left-3">
                    <div className="w-7 h-7 rounded-lg overflow-hidden shadow-md">
                      {post.platform === 'instagram' ? <InstagramIcon /> : post.platform === 'youtube' ? <YouTubeIcon /> : <TikTokIcon />}
                    </div>
                  </div>
                  {/* Content type badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${
                      post.type === 'Reel' ? 'bg-purple-500 text-white' : post.type === 'Story' ? 'bg-blue-500 text-white' : 'bg-white/90 text-brand-dark backdrop-blur-sm'
                    }`}>
                      {post.type}
                    </span>
                  </div>
                  {/* Bottom stats overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1">
                      <svg className="w-3 h-3 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <span className="text-[10px] font-bold text-white">{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1">
                      <svg className="w-3 h-3 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-[10px] font-bold text-white">{post.comments.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-4 py-3.5">
                  {/* Influencer row */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <img src={post.avatarUrl} alt={post.influencer} className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] font-black text-brand-dark truncate">{post.influencer}</p>
                      <p className="text-[10px] font-bold text-brand-gray">@{post.username}</p>
                    </div>
                    <span className="text-[10px] font-bold text-brand-gray shrink-0">{new Date(post.postedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}</span>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-1 bg-gray-50 rounded-xl px-3.5 py-2.5">
                    <div className="flex-1 text-center">
                      <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Impressions</p>
                      <p className="text-[13px] font-black text-brand-dark mt-0.5">{post.impressions.toLocaleString()}</p>
                    </div>
                    <div className="w-px h-7 bg-gray-200" />
                    <div className="flex-1 text-center">
                      <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Value</p>
                      <p className="text-[13px] font-black text-emerald-600 mt-0.5">${post.mediaValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'Insights' ? (
        <InsightsView />
      ) : (
        /* Placeholder for other tabs */
        <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-gray-100 shadow-soft italic text-brand-gray">
          {activeTab} view is coming soon...
        </div>
      )}

      {/* Detail Popup */}
      {selectedInfluencer && (
        <InfluencerDetailPopup
          influencer={selectedInfluencer}
          onClose={() => setSelectedInfluencer(null)}
          campaignTags={campaignTags}
        />
      )}

      {/* Tags Popup */}
      {showTagsPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowTagsPopup(false)} />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-accent to-brand-accent/90 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-lg p-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-[15px]">Campaign Tags</h3>
                  <p className="text-white/70 text-[11px] font-medium">Add custom tags to organize this campaign</p>
                </div>
              </div>
              <button
                onClick={() => setShowTagsPopup(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tags list */}
            <div className="px-6 py-5 max-h-[320px] overflow-y-auto scrollbar-hide">
              {campaignTags.length === 0 ? (
                <div className="text-center py-10">
                  <div className="bg-gray-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <p className="text-[13px] font-semibold text-gray-900">No tags yet</p>
                  <p className="text-[12px] text-gray-500 mt-1">Add your first tag below to get started</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {campaignTags.map((tag, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 group hover:border-gray-200 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-brand-accent" />
                        <span className="text-[13px] font-semibold text-gray-900">{tag}</span>
                      </div>
                      <button
                        onClick={() => setCampaignTags(campaignTags.filter((_, i) => i !== idx))}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add new tag input */}
            <div className="px-6 pb-5">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newTagInput.trim()) {
                        setCampaignTags([...campaignTags, newTagInput.trim()]);
                        setNewTagInput('');
                      }
                    }}
                    placeholder="Type a new tag..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-[13px] font-medium text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all"
                  />
                </div>
                <button
                  onClick={() => {
                    if (newTagInput.trim()) {
                      setCampaignTags([...campaignTags, newTagInput.trim()]);
                      setNewTagInput('');
                    }
                  }}
                  className="bg-brand-accent text-white font-bold py-3 px-6 rounded-xl text-[11px] tracking-wider hover:brightness-110 transition-all shadow-md uppercase whitespace-nowrap"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={() => setShowTagsPopup(false)}
                className="w-full py-3 text-[12px] font-bold text-gray-500 hover:text-gray-700 transition-colors uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign to Campaign Popup */}
      {showAssignPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAssignPopup(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-lg p-2">
                  <PlusIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-[15px]">Assign to Campaign</h3>
                  <p className="text-white/70 text-[11px] font-medium">Select a campaign for @{showAssignPopup}</p>
                </div>
              </div>
              <button onClick={() => setShowAssignPopup(null)} className="text-white/80 hover:text-white transition-colors p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Campaign List */}
            <div className="px-6 py-5 space-y-2 max-h-[320px] overflow-y-auto scrollbar-hide">
              {availableCampaigns.map((camp, idx) => (
                <button
                  key={idx}
                  onClick={() => setShowAssignPopup(null)}
                  className="w-full flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 group hover:border-emerald-300 hover:bg-emerald-50/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <LayersIcon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-[13px] font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">{camp}</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              ))}
            </div>
            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button onClick={() => setShowAssignPopup(null)} className="w-full py-3 text-[12px] font-bold text-gray-500 hover:text-gray-700 transition-colors uppercase tracking-wider">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove from Campaign Confirmation */}
      {showRemoveConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowRemoveConfirm(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-8 text-center">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-[16px] font-bold text-gray-900 mb-2">Remove from Campaign?</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                This will remove <span className="font-semibold text-gray-700">@{showRemoveConfirm}</span> from this campaign only. They will remain in your database.
              </p>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setShowRemoveConfirm(null)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold text-[12px] rounded-xl hover:bg-gray-200 transition-all uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setRemovedInfluencers([...removedInfluencers, showRemoveConfirm]);
                  setShowRemoveConfirm(null);
                }}
                className="flex-1 py-3 bg-red-500 text-white font-bold text-[12px] rounded-xl hover:bg-red-600 transition-all uppercase tracking-wider shadow-md"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Template Selection Popup */}
      {showEmailTemplatePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowEmailTemplatePopup(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-lg p-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-[15px]">Email Templates</h3>
                  <p className="text-white/70 text-[11px] font-medium">Select a template for this batch send</p>
                </div>
              </div>
              <button onClick={() => setShowEmailTemplatePopup(false)} className="text-white/80 hover:text-white transition-colors p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            {/* Template List */}
            <div className="px-5 py-4 max-h-[400px] overflow-y-auto scrollbar-hide space-y-2">
              {emailTemplates.map((tmpl) => {
                const isSelected = selectedEmailTemplate === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => { setSelectedEmailTemplate(tmpl.id); setShowEmailTemplatePopup(false); }}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-300'
                        : 'bg-white border-gray-100 hover:border-blue-200 hover:bg-blue-50/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] font-bold text-brand-dark">{tmpl.name}</span>
                      {isSelected && (
                        <span className="text-[9px] font-black text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full uppercase">Selected</span>
                      )}
                    </div>
                    <p className="text-[11px] font-semibold text-brand-accent mb-1">{tmpl.subject}</p>
                    <p className="text-[10px] text-brand-gray leading-relaxed">{tmpl.preview}</p>
                  </button>
                );
              })}
            </div>
            {/* Footer */}
            {selectedEmailTemplate && (
              <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                <button
                  onClick={() => { setSelectedEmailTemplate(null); }}
                  className="text-[11px] font-bold text-red-500 hover:text-red-600 transition-colors"
                >
                  Clear selection
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* View Email Preview Popup */}
      {showViewEmailPopup && selectedEmailTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowViewEmailPopup(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header bar */}
            <div className="bg-gradient-to-r from-brand-accent to-brand-accent/90 px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-lg p-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-[15px]">Email Template</h3>
                  <p className="text-white/70 text-[11px] font-medium">Preview your email before sending</p>
                </div>
              </div>
              <button onClick={() => setShowViewEmailPopup(false)} className="text-white/80 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Email meta fields */}
            {(() => {
              const tmpl = emailTemplates.find(t => t.id === selectedEmailTemplate);
              if (!tmpl) return null;
              const sampleName = influencers[0]?.name || 'Influencer';
              return (
                <>
                  <div className="px-6 py-4 border-b border-gray-100 shrink-0 space-y-2.5 bg-[#FDFCFB]">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-brand-gray uppercase tracking-wider w-16 shrink-0">From:</span>
                      <span className="text-[12px] font-semibold text-brand-dark">
                        {connectedEmail === 'google' ? 'you@gmail.com' : 'you@outlook.com'}
                        <span className="text-[10px] text-emerald-500 font-bold ml-2">({connectedEmail === 'google' ? 'Google' : 'Outlook'})</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-brand-gray uppercase tracking-wider w-16 shrink-0">To:</span>
                      <span className="text-[12px] font-semibold text-brand-dark">
                        {toggledCount > 0 ? `${toggledCount} influencer${toggledCount > 1 ? 's' : ''} selected` : 'No recipients selected'}
                        {toggledCount > 0 && (
                          <span className="text-[10px] text-brand-gray font-medium ml-1">(personalised per recipient)</span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-brand-gray uppercase tracking-wider w-16 shrink-0">Subject:</span>
                      <span className="text-[13px] font-bold text-brand-dark">{tmpl.subject.replace('{campaign}', campaignName)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-brand-gray uppercase tracking-wider w-16 shrink-0">Template:</span>
                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase">{tmpl.name}</span>
                    </div>
                  </div>

                  {/* Scrollable email body */}
                  <div className="flex-1 overflow-y-auto scrollbar-hide">
                    <div className="px-8 py-6">
                      <div className="text-[13px] text-brand-dark leading-[1.8] space-y-4">
                        <p>Hello {sampleName}!</p>

                        <p>{tmpl.preview.replace('{name}', sampleName)}</p>

                        <p><strong>The Collaboration:</strong></p>

                        <p>We are looking for a captivating Instagram Reel featuring one of our signature products. In your kit, you&apos;ll find everything you need to celebrate in style, including:</p>

                        <ul className="list-disc pl-6 space-y-1">
                          <li>A complimentary product sample for your content.</li>
                          <li>Our signature branded accessories (please ensure this is used in your video!).</li>
                          <li>Exclusive merch to wear on camera.</li>
                        </ul>

                        <p><strong>Video Concept:</strong> Show your audience how you enjoy the product in your own unique style. We ask that you tag our brand and use the campaign hashtags.</p>

                        <p><strong>Key Dates:</strong></p>
                        <p>Mid Feb: Product dispatched to your address.<br />
                        Late Feb: Hard Deadline for draft content submission.<br />
                        March 1–17: Content go-live window.</p>

                        <p><strong>Key Points:</strong></p>

                        <p><strong>Paid Partnership:</strong> This is a paid collaboration, and we look forward to a mutually beneficial campaign.</p>

                        <p><strong>Rates:</strong> If you&apos;re interested, please provide your standard rates for an Instagram Reel when you reply.</p>

                        <p><strong>Usage Rights:</strong> By moving forward, you agree to grant usage rights to repost your content for social media and advertising purposes.</p>

                        <p>We&apos;ve attached the full media kit with creative ideas and notes for your reference. We look forward to the possibility of working together to make this campaign special!</p>

                        <p>Best,<br />
                        The {campaignName} Team</p>
                      </div>

                      {/* Attachments section */}
                      <div className="mt-6 pt-5 border-t border-gray-100">
                        <p className="text-[10px] font-black text-brand-gray uppercase tracking-wider mb-3">Attachments</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 hover:border-brand-accent/30 transition-all cursor-pointer group">
                            <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] font-bold text-brand-dark truncate group-hover:text-brand-accent transition-colors">{campaignName} Influencer Media Kit.pdf</p>
                              <p className="text-[10px] text-brand-gray font-medium">PDF • 2.4 MB</p>
                            </div>
                            <svg className="w-4 h-4 text-gray-300 group-hover:text-brand-accent transition-colors shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                          </div>
                          <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 hover:border-brand-accent/30 transition-all cursor-pointer group">
                            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] font-bold text-brand-dark truncate group-hover:text-brand-accent transition-colors">Recipe Ideas & Tasting Notes.pdf</p>
                              <p className="text-[10px] text-brand-gray font-medium">PDF • 856 KB</p>
                            </div>
                            <svg className="w-4 h-4 text-gray-300 group-hover:text-brand-accent transition-colors shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Personalisation note */}
                      <div className="mt-5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                        <p className="text-[11px] text-amber-700 font-medium">
                          <strong>Note:</strong> Personalisation tokens (e.g. recipient name) will be replaced for each influencer when the email is sent.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-[#FDFCFB] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-xl text-[11px] font-bold text-brand-gray border border-gray-200 hover:bg-gray-100 transition-all flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                  </svg>
                  Attach File
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowViewEmailPopup(false)}
                  className="px-5 py-2 rounded-xl text-[11px] font-bold text-gray-600 border border-gray-200 hover:bg-gray-100 transition-all"
                >
                  Close
                </button>
                {canSendEmail && (
                  <button className="px-6 py-2.5 rounded-xl text-[11px] font-black bg-brand-accent text-white hover:brightness-110 shadow-md transition-all flex items-center gap-2 uppercase tracking-wider">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    Send to {toggledCount} Influencer{toggledCount > 1 ? 's' : ''}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Detail Popup */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedPost(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[88vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col">
            {/* Header */}
            <div className="shrink-0 bg-[#FDFCFB] border-b border-gray-100 px-6 py-3.5 flex items-center gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img src={selectedPost.avatarUrl} alt={selectedPost.influencer} className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
                <div className="min-w-0">
                  <h3 className="text-[13px] font-black text-brand-dark truncate">{selectedPost.influencer}</h3>
                  <p className="text-[11px] font-bold text-brand-gray">@{selectedPost.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-6 h-6 rounded-md overflow-hidden shadow-sm">
                  {selectedPost.platform === 'instagram' ? <InstagramIcon /> : selectedPost.platform === 'youtube' ? <YouTubeIcon /> : <TikTokIcon />}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  selectedPost.type === 'Reel' ? 'bg-purple-50 text-purple-600' : selectedPost.type === 'Story' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-brand-dark'
                }`}>
                  {selectedPost.type}
                </span>
              </div>
              <button onClick={() => setSelectedPost(null)} className="text-gray-400 hover:text-brand-dark transition-colors ml-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col lg:flex-row">
                {/* Left: Image */}
                <div className="lg:w-[55%] shrink-0 bg-black flex items-center justify-center">
                  <img
                    src={selectedPost.thumbnailUrl}
                    alt={selectedPost.caption}
                    className="w-full h-full object-cover max-h-[60vh] lg:max-h-none"
                  />
                </div>

                {/* Right: Details */}
                <div className="flex-1 flex flex-col">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-0 border-b border-gray-100">
                    <div className="px-5 py-4 border-r border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Likes</span>
                      </div>
                      <p className="text-[20px] font-black text-brand-dark">{selectedPost.likes.toLocaleString()}</p>
                    </div>
                    <div className="px-5 py-4">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Comments</span>
                      </div>
                      <p className="text-[20px] font-black text-brand-dark">{selectedPost.comments.toLocaleString()}</p>
                    </div>
                    <div className="px-5 py-4 border-r border-t border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Impressions</span>
                      </div>
                      <p className="text-[20px] font-black text-brand-dark">{selectedPost.impressions.toLocaleString()}</p>
                    </div>
                    <div className="px-5 py-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Media Value</span>
                      </div>
                      <p className="text-[20px] font-black text-emerald-600">${selectedPost.mediaValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                  </div>

                  {/* Engagement Rate */}
                  <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Engagement Rate</span>
                      <span className="text-[13px] font-black text-brand-accent">
                        {((selectedPost.likes + selectedPost.comments) / selectedPost.impressions * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div
                        className="bg-gradient-to-r from-brand-accent to-brand-accent/70 h-1.5 rounded-full transition-all"
                        style={{ width: `${Math.min(((selectedPost.likes + selectedPost.comments) / selectedPost.impressions * 100) * 10, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="px-5 py-4 flex-1">
                    <h4 className="text-[10px] font-bold text-brand-gray uppercase tracking-wider mb-2">Caption</h4>
                    <p className="text-[13px] text-brand-dark leading-relaxed">{selectedPost.caption}</p>
                  </div>

                  {/* Post date & meta */}
                  <div className="px-5 py-3.5 border-t border-gray-100 bg-[#FDFCFB]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-brand-gray" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[11px] font-bold text-brand-gray">
                          Posted {new Date(selectedPost.postedAt).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">
                          {selectedPost.platform.charAt(0).toUpperCase() + selectedPost.platform.slice(1)}
                        </span>
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          selectedPost.type === 'Reel' ? 'bg-purple-100 text-purple-600' : selectedPost.type === 'Story' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-brand-dark'
                        }`}>
                          {selectedPost.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-gray-100 px-6 py-3.5 flex items-center justify-between bg-[#FDFCFB]">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-[11px] font-bold text-brand-gray hover:bg-gray-50 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-[11px] font-bold text-brand-gray hover:bg-gray-50 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2 rounded-xl bg-brand-dark text-white text-[11px] font-black uppercase tracking-wider hover:bg-brand-dark/90 transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discover Influencers Popup */}
      {showDiscoverPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDiscoverPopup(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col">

            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-black text-brand-dark">Discover Influencers</h2>
                <button
                  onClick={() => setShowDiscoverPopup(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-gray-50 p-1 rounded-xl">
                {(['Pro Collections', 'Search Database', 'Add from Campaigns'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setDiscoverTab(tab); setDiscoverSearched(false); setDiscoverResults([]); setSelectedCampaignSource(null); setSelectedProCollection(null); setExpandedDiscoverUsername(null); setDiscoverExpandPost(null); }}
                    className={`flex-1 px-4 py-2 text-[11px] font-black rounded-lg transition-all ${
                      discoverTab === tab
                        ? 'bg-brand-accent text-white shadow-md'
                        : 'text-brand-gray hover:bg-gray-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Body */}
            <div
              className="flex-1 overflow-y-auto p-6 scrollbar-hide"
              onScroll={(e) => {
                const target = e.target as HTMLDivElement;
                if (target.scrollHeight - target.scrollTop - target.clientHeight < 120 && discoverSearched) {
                  const visibleCount = discoverResults.filter(inf => !dismissedFromDiscover.includes(inf.username)).length;
                  if (discoverVisibleCount < visibleCount) {
                    setDiscoverVisibleCount(prev => Math.min(prev + 20, visibleCount));
                  }
                }
              }}
            >

              {discoverTab === 'Search Database' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  {/* Filter fields */}
                  <div className="space-y-3">
                    <select
                      value={discoverFilters.country}
                      onChange={(e) => setDiscoverFilters({ ...discoverFilters, country: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all"
                    >
                      <option value="">All Countries</option>
                      <option value="AU">Australia</option>
                      <option value="FR">France</option>
                      <option value="IN">India</option>
                      <option value="ID">Indonesia</option>
                      <option value="IT">Italy</option>
                      <option value="JP">Japan</option>
                      <option value="NZ">New Zealand</option>
                      <option value="SG">Singapore</option>
                      <option value="KR">South Korea</option>
                      <option value="UK">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="VN">Vietnam</option>
                    </select>
                    <input
                      type="text"
                      placeholder="State"
                      value={discoverFilters.state}
                      onChange={(e) => setDiscoverFilters({ ...discoverFilters, state: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={discoverFilters.city}
                      onChange={(e) => setDiscoverFilters({ ...discoverFilters, city: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all"
                    />
                    <select
                      value={discoverFilters.category}
                      onChange={(e) => setDiscoverFilters({ ...discoverFilters, category: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all"
                    >
                      <option value="">Select Category</option>
                      <option value="Food">Food</option>
                      <option value="Lifestyle Media">Lifestyle Media</option>
                      <option value="Wellness Lifestyle">Wellness Lifestyle</option>
                      <option value="Celebrity">Celebrity</option>
                      <option value="Home Cooking">Home Cooking</option>
                      <option value="Ceramic Art">Ceramic Art</option>
                    </select>
                    <select
                      value={discoverFilters.gender}
                      onChange={(e) => setDiscoverFilters({ ...discoverFilters, gender: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>

                    <label className="flex items-center gap-2.5 py-1 px-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={discoverFilters.hasEmail}
                        onChange={(e) => setDiscoverFilters({ ...discoverFilters, hasEmail: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent"
                      />
                      <span className="text-[12px] font-semibold text-brand-dark">Has Email</span>
                    </label>

                    <div className="h-px bg-gray-100" />

                    <select
                      value={discoverFilters.channel}
                      onChange={(e) => setDiscoverFilters({ ...discoverFilters, channel: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all"
                    >
                      <option value="">Channel</option>
                      <option value="instagram">Instagram</option>
                      <option value="youtube">YouTube</option>
                      <option value="tiktok">TikTok</option>
                    </select>
                    <select
                      value={discoverFilters.favourite}
                      onChange={(e) => setDiscoverFilters({ ...discoverFilters, favourite: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all"
                    >
                      <option value="">Favourite</option>
                      <option value="yes">Favourites Only</option>
                    </select>

                    <div className="h-px bg-gray-100" />

                    {/* Audience range */}
                    <div>
                      <p className="text-[11px] font-bold text-brand-dark mb-2">Audience</p>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="From"
                          value={discoverFilters.audienceFrom}
                          onChange={(e) => setDiscoverFilters({ ...discoverFilters, audienceFrom: e.target.value })}
                          className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all"
                        />
                        <input
                          type="text"
                          placeholder="To"
                          value={discoverFilters.audienceTo}
                          onChange={(e) => setDiscoverFilters({ ...discoverFilters, audienceTo: e.target.value })}
                          className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Media Value range */}
                    <div>
                      <p className="text-[11px] font-bold text-brand-dark mb-2">Media Value</p>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="From"
                          value={discoverFilters.mediaValueFrom}
                          onChange={(e) => setDiscoverFilters({ ...discoverFilters, mediaValueFrom: e.target.value })}
                          className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all"
                        />
                        <input
                          type="text"
                          placeholder="To"
                          value={discoverFilters.mediaValueTo}
                          onChange={(e) => setDiscoverFilters({ ...discoverFilters, mediaValueTo: e.target.value })}
                          className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => { setDiscoverFilters({ country: '', state: '', city: '', category: '', gender: '', hasEmail: false, channel: '', favourite: '', audienceFrom: '', audienceTo: '', mediaValueFrom: '', mediaValueTo: '' }); setDiscoverSearched(false); setDiscoverResults([]); }}
                      className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold text-[11px] rounded-xl hover:bg-gray-200 transition-all uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDiscoverSearch}
                      className="px-8 py-2.5 bg-brand-accent text-white font-black text-[11px] rounded-xl hover:brightness-110 transition-all shadow-md uppercase tracking-wider"
                    >
                      Search
                    </button>
                  </div>

                  {/* Results */}
                  {discoverSearched && (() => {
                    const visibleResults = discoverResults.filter(inf => !dismissedFromDiscover.includes(inf.username));
                    const paginatedResults = visibleResults.slice(0, discoverVisibleCount);
                    const hasMore = paginatedResults.length < visibleResults.length;
                    return (
                    <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-black text-brand-dark uppercase tracking-widest">
                          {visibleResults.length} Result{visibleResults.length !== 1 ? 's' : ''} Found
                        </p>
                        {addedFromDiscover.length > 0 && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                            {addedFromDiscover.length} added to campaign
                          </span>
                        )}
                      </div>

                      {visibleResults.length === 0 ? (
                        <div className="text-center py-10">
                          <div className="bg-gray-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                            <SearchIcon className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="text-[13px] font-semibold text-gray-900">No influencers found</p>
                          <p className="text-[12px] text-gray-500 mt-1">Try adjusting your filters</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {paginatedResults.map((inf: any) => {
                            const isAdded = addedFromDiscover.includes(inf.username);
                            const isExpanded = expandedDiscoverUsername === inf.username;
                            return (
                              <div key={inf.username} className="flex flex-col">
                                <div
                                  onClick={() => handleToggleDiscoverExpand(inf.username)}
                                  className={`flex items-center gap-3 p-3 border rounded-xl transition-all cursor-pointer group ${
                                    isExpanded ? 'bg-brand-accent/5 border-brand-accent/30 rounded-b-none' : isAdded ? 'bg-emerald-50/40 border-emerald-200' : 'bg-[#FDFCFB] border-gray-100 hover:border-gray-200'
                                  }`}
                                >
                                  {/* Profile image */}
                                  <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white ring-1 ring-gray-100 shrink-0">
                                    <img src={inf.imageUrl} alt={inf.name} className="w-full h-full object-cover" />
                                  </div>

                                  {/* Info */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <h4 className="text-[13px] font-black text-brand-dark truncate">{inf.name}</h4>
                                      {inf.hasEmail && (
                                        <svg className="w-3.5 h-3.5 text-brand-accent shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-brand-gray mt-0.5">
                                      <span>{inf.flag} {inf.location}</span>
                                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                      <span>{inf.category}</span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1">
                                      <div className="flex items-center gap-1.5">
                                        {inf.platforms.includes('instagram') && <div className="w-3.5 h-3.5"><InstagramIcon /></div>}
                                        {inf.platforms.includes('youtube') && <div className="w-3.5 h-3.5"><YouTubeIcon /></div>}
                                        {inf.platforms.includes('tiktok') && <div className="w-3.5 h-3.5"><TikTokIcon /></div>}
                                      </div>
                                      <span className="text-[10px] font-bold text-brand-gray">{inf.followers}</span>
                                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                      <span className="text-[10px] font-black text-brand-accent">{inf.estimatedValue}</span>
                                    </div>
                                  </div>

                                  {/* Expand chevron */}
                                  <svg className={`w-4 h-4 text-brand-gray shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                  </svg>

                                  {/* Action buttons — green tick & red X */}
                                  <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                                    <button
                                      onClick={() => handleAddInfluencerToCampaign(inf.username)}
                                      disabled={isAdded}
                                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                                        isAdded
                                          ? 'bg-emerald-500 text-white shadow-md cursor-default'
                                          : 'bg-emerald-50 text-emerald-500 border border-emerald-200 hover:bg-emerald-500 hover:text-white hover:shadow-md hover:border-emerald-500'
                                      }`}
                                      title={isAdded ? 'Added to campaign' : 'Add to campaign'}
                                    >
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    </button>
                                    {!isAdded && (
                                      <button
                                        onClick={() => handleDismissFromDiscover(inf.username)}
                                        className="w-9 h-9 rounded-full flex items-center justify-center bg-red-50 text-red-400 border border-red-200 hover:bg-red-500 hover:text-white hover:shadow-md hover:border-red-500 transition-all"
                                        title="Remove from results"
                                      >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      </button>
                                    )}
                                  </div>
                                </div>

                                {/* ===== EXPANDED PROFILE SECTION ===== */}
                                {isExpanded && (
                                  <div className="border border-t-0 border-brand-accent/30 rounded-b-xl bg-[#FDFCFB] animate-in slide-in-from-top-2 fade-in duration-300">
                                    {/* Sub-tabs */}
                                    <div className="flex gap-1 px-4 pt-4 pb-3 border-b border-gray-100">
                                      {(['Key Stats', 'Audience', 'Content'] as const).map((tab) => (
                                        <button
                                          key={tab}
                                          onClick={(e) => { e.stopPropagation(); setDiscoverExpandTab(tab); setDiscoverExpandPost(null); }}
                                          className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-wider uppercase transition-all border ${
                                            discoverExpandTab === tab
                                              ? 'bg-brand-accent text-white border-brand-accent shadow-sm'
                                              : 'bg-white text-brand-gray border-gray-200 hover:border-brand-accent/30'
                                          }`}
                                        >
                                          {tab}
                                        </button>
                                      ))}
                                    </div>

                                    <div className="p-4">
                                      {/* === KEY STATS TAB === */}
                                      {discoverExpandTab === 'Key Stats' && (
                                        <div className="space-y-4 animate-in fade-in duration-200">
                                          {/* Brand Fit, Location, Badges, Ranking */}
                                          <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                                            <div className="flex flex-col">
                                              <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest opacity-60">Brand Fit</span>
                                              <span className="text-[13px] font-black text-brand-dark mt-0.5">{inf.category}</span>
                                            </div>
                                            <div className="flex flex-col">
                                              <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest opacity-60">Location</span>
                                              <span className="text-[13px] font-black text-brand-dark mt-0.5">{inf.flag} {inf.location}, {countryNames[inf.region] || inf.region}</span>
                                            </div>
                                          </div>

                                          <div className="space-y-2 pt-3 border-t border-gray-100">
                                            <p className="text-[11px] font-black text-brand-dark">Mapkats Badges</p>
                                            <div className="flex flex-wrap gap-1.5">
                                              <span className="bg-brand-accent text-white px-2.5 py-1 rounded-lg text-[10px] font-bold italic">#{Math.floor(Math.random() * 20) + 1} {inf.category}</span>
                                              <span className="bg-brand-dark text-white px-2.5 py-1 rounded-lg text-[10px] font-semibold">Top 10 Viewed</span>
                                              <span className="bg-[#82A3C4] text-white px-2.5 py-1 rounded-lg text-[10px] font-semibold">Top 10 Saved</span>
                                            </div>
                                          </div>

                                          <div className="flex items-center gap-3 p-3 bg-orange-50/40 rounded-xl border border-orange-100/50">
                                            <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm">
                                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/></svg>
                                            </div>
                                            <div className="flex-1">
                                              <p className="text-[9px] font-black text-brand-accent uppercase tracking-widest">Mapkats Ranking</p>
                                              <p className="text-[12px] font-black text-brand-dark">#{Math.floor(Math.random() * 15) + 1} in <span className="text-brand-accent">{inf.category}</span></p>
                                            </div>
                                          </div>

                                          {/* Recent posts */}
                                          <div className="space-y-2 pt-3 border-t border-gray-100">
                                            <p className="text-[10px] font-black text-brand-gray uppercase tracking-widest opacity-60">Recent</p>

                                            {/* Post detail expanded view */}
                                            {discoverExpandPost && (
                                              <div className="bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 mb-3">
                                                <div className="flex">
                                                  <div className="w-[55%] aspect-square max-h-[200px]">
                                                    <img src={discoverExpandPost.imageUrl} alt="Post" className="w-full h-full object-cover" />
                                                  </div>
                                                  <div className="w-[45%] p-3 flex flex-col">
                                                    <p className="text-[11px] font-medium text-brand-dark leading-relaxed flex-1 line-clamp-5">{discoverExpandPost.caption}</p>
                                                    <div className="flex items-center gap-4 mt-2 pt-2 border-t border-gray-100">
                                                      <span className="flex items-center gap-1 text-[10px] font-bold text-brand-gray">
                                                        <svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                                        {discoverExpandPost.likes.toLocaleString()}
                                                      </span>
                                                      <span className="flex items-center gap-1 text-[10px] font-bold text-brand-gray">
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                                        {discoverExpandPost.comments}
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <button
                                                  onClick={(e) => { e.stopPropagation(); setDiscoverExpandPost(null); }}
                                                  className="w-full py-2 text-center text-[10px] font-bold text-brand-gray bg-gray-50 hover:bg-gray-100 transition-colors border-t border-gray-100"
                                                >
                                                  Close post
                                                </button>
                                              </div>
                                            )}

                                            <div className="grid grid-cols-6 gap-1.5">
                                              {discoverRecentPosts.map((post, i) => (
                                                <div
                                                  key={i}
                                                  className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer group relative border border-gray-50"
                                                  onClick={(e) => { e.stopPropagation(); setDiscoverExpandPost(discoverExpandPost?.imageUrl === post.imageUrl ? null : post); }}
                                                >
                                                  <img src={post.imageUrl} alt={`Post ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <svg className="w-4 h-4 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                    </svg>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                      {/* === AUDIENCE TAB === */}
                                      {discoverExpandTab === 'Audience' && (
                                        <div className="space-y-4 animate-in fade-in duration-200">
                                          {/* Gender */}
                                          <div className="space-y-2">
                                            <p className="text-[11px] font-black text-brand-dark">Gender</p>
                                            <div className="space-y-2">
                                              <div>
                                                <div className="flex justify-between items-center mb-1">
                                                  <p className="text-[10px] font-semibold text-brand-dark">Women {inf.gender === 'Female' ? '58.3%' : '27.9%'}</p>
                                                </div>
                                                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                                  <div className="bg-brand-accent h-full rounded-full" style={{ width: inf.gender === 'Female' ? '58.3%' : '27.9%' }}></div>
                                                </div>
                                              </div>
                                              <div>
                                                <div className="flex justify-between items-center mb-1">
                                                  <p className="text-[10px] font-semibold text-brand-dark">Men {inf.gender === 'Female' ? '38.5%' : '68.4%'}</p>
                                                </div>
                                                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                                  <div className="bg-[#82A3C4] h-full rounded-full" style={{ width: inf.gender === 'Female' ? '38.5%' : '68.4%' }}></div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Top Countries */}
                                          <div className="space-y-2 pt-3 border-t border-gray-100">
                                            <p className="text-[11px] font-black text-brand-dark">Top countries</p>
                                            <div className="flex flex-wrap gap-1.5">
                                              <span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">{countryNames[inf.region] || inf.region} (42%)</span>
                                              <span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">United States (18%)</span>
                                              <span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">United Kingdom (9%)</span>
                                              <span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">India (4.1%)</span>
                                            </div>
                                          </div>

                                          {/* Top Cities */}
                                          <div className="space-y-2 pt-3 border-t border-gray-100">
                                            <p className="text-[11px] font-black text-brand-dark">Top cities</p>
                                            <div className="flex flex-wrap gap-1.5">
                                              <span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">{inf.location} (35.2%)</span>
                                              <span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">London (6.8%)</span>
                                              <span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">New York (4.5%)</span>
                                              <span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">Sydney (3.2%)</span>
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                      {/* === CONTENT TAB === */}
                                      {discoverExpandTab === 'Content' && (
                                        <div className="space-y-4 animate-in fade-in duration-200">
                                          {/* Format Performance */}
                                          <div className="space-y-2">
                                            <p className="text-[11px] font-black text-brand-dark">Format performance (avg engagement)</p>
                                            <div className="space-y-2">
                                              <div>
                                                <div className="flex justify-between items-center mb-1">
                                                  <p className="text-[10px] font-semibold text-brand-dark">Photos 4.1%</p>
                                                </div>
                                                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                                  <div className="bg-brand-accent h-full rounded-full" style={{ width: '41%' }}></div>
                                                </div>
                                              </div>
                                              <div>
                                                <div className="flex justify-between items-center mb-1">
                                                  <p className="text-[10px] font-semibold text-brand-dark">Reels 2.5%</p>
                                                </div>
                                                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                                  <div className="bg-brand-accent h-full rounded-full" style={{ width: '25%' }}></div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Top Content */}
                                          <div className="space-y-2 pt-3 border-t border-gray-100">
                                            <p className="text-[11px] font-black text-brand-dark">Top content (last 30 days)</p>
                                            <div className="flex flex-wrap gap-1.5">
                                              {[
                                                { label: 'Avg views', value: '12.4K' },
                                                { label: 'Median views', value: '8.2K' },
                                                { label: 'Saves rate', value: '2.1%' },
                                                { label: 'Share rate', value: '0.8%' },
                                              ].map((item) => (
                                                <span key={item.label} className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">
                                                  {item.label}: {item.value}
                                                </span>
                                              ))}
                                            </div>
                                          </div>

                                          {/* Cadence */}
                                          <div className="space-y-2 pt-3 border-t border-gray-100">
                                            <p className="text-[11px] font-black text-brand-dark">Cadence</p>
                                            <div className="flex flex-wrap gap-1.5">
                                              {[
                                                { label: 'Posts', value: '23' },
                                                { label: 'Reels', value: '7' },
                                                { label: 'Stories', value: '12' },
                                                { label: 'Avg posts/week', value: '5' },
                                              ].map((item) => (
                                                <span key={item.label} className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">
                                                  {item.label}: {item.value}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}

                          {/* Load more trigger — auto scroll to load */}
                          {hasMore && (
                            <div className="pt-3 pb-1">
                              <button
                                onClick={() => setDiscoverVisibleCount(discoverVisibleCount + 20)}
                                className="w-full py-3 text-center text-[11px] font-bold text-brand-accent bg-brand-accent/5 border border-brand-accent/15 rounded-xl hover:bg-brand-accent/10 transition-all"
                              >
                                Load more ({visibleResults.length - paginatedResults.length} remaining)
                              </button>
                            </div>
                          )}

                          {/* End of results indicator */}
                          {!hasMore && visibleResults.length > 0 && (
                            <p className="text-center text-[10px] font-bold text-gray-400 pt-3 uppercase tracking-widest">
                              End of results
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    );
                  })()}
                </div>
              )}

              {discoverTab === 'Pro Collections' && (
                <div className="animate-in fade-in duration-200">
                  {!selectedProCollection ? (
                    /* Step 1: Collection grid */
                    <div className="space-y-6">
                      <p className="text-[12px] text-brand-gray leading-relaxed">Browse curated collections of top-performing influencers handpicked by our team.</p>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { name: 'Top Food & Bev AU', count: 12, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=600', categories: ['Food', 'Home Cooking'] },
                          { name: 'Lifestyle Leaders', count: 8, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600', categories: ['Lifestyle Media', 'Celebrity'] },
                          { name: 'Fitness & Wellness', count: 7, image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600', categories: ['Wellness Lifestyle'] },
                          { name: 'Travel Creators', count: 6, image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=600', categories: [] },
                        ].map((col) => (
                          <div
                            key={col.name}
                            onClick={() => { setSelectedProCollection(col.name); setExpandedDiscoverUsername(null); setDiscoverExpandPost(null); setDismissedFromDiscover([]); }}
                            className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-panel hover:-translate-y-0.5 transition-all cursor-pointer group"
                          >
                            <div className="relative w-full h-32 overflow-hidden">
                              <img
                                src={col.image}
                                alt={col.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                              <button
                                onClick={(e) => e.stopPropagation()}
                                className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm hover:bg-brand-accent hover:text-white transition-all"
                              >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                              </button>
                            </div>
                            <div className="px-4 py-3">
                              <h4 className="text-[13px] font-black text-brand-dark group-hover:text-brand-accent transition-colors">{col.name}</h4>
                              <p className="text-[11px] font-bold text-brand-gray mt-0.5">{col.count} Influencers</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Step 2: Influencer list for selected collection */
                    (() => {
                      const collectionMap: Record<string, string[]> = {
                        'Top Food & Bev AU': ['Food', 'Home Cooking'],
                        'Lifestyle Leaders': ['Lifestyle Media', 'Celebrity'],
                        'Fitness & Wellness': ['Wellness Lifestyle'],
                        'Travel Creators': [],
                      };
                      const filterCats = collectionMap[selectedProCollection] || [];
                      const collectionInfluencers = filterCats.length > 0
                        ? databaseInfluencers.filter(inf => filterCats.includes(inf.category))
                        : databaseInfluencers;
                      const visibleCollectionResults = collectionInfluencers.filter(inf => !dismissedFromDiscover.includes(inf.username));

                      return (
                        <div className="space-y-4">
                          {/* Back button */}
                          <button
                            onClick={() => { setSelectedProCollection(null); setExpandedDiscoverUsername(null); setDiscoverExpandPost(null); }}
                            className="flex items-center gap-1.5 text-[11px] font-black text-brand-accent hover:underline uppercase tracking-wider"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to collections
                          </button>

                          {/* Collection header */}
                          <div className="bg-gradient-to-r from-brand-accent/10 to-brand-accent/5 border border-brand-accent/15 rounded-xl px-4 py-3 flex items-center gap-3">
                            <LayersIcon className="w-5 h-5 text-brand-accent shrink-0" />
                            <div className="flex-1 min-w-0">
                              <span className="text-[13px] font-black text-brand-dark">{selectedProCollection}</span>
                              <span className="text-[11px] font-bold text-brand-gray ml-2">({visibleCollectionResults.length} influencers)</span>
                            </div>
                            {addedFromDiscover.length > 0 && (
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 shrink-0">
                                {addedFromDiscover.length} added
                              </span>
                            )}
                            {(() => {
                              const notYetAdded = visibleCollectionResults.filter((inf: any) => !addedFromDiscover.includes(inf.username));
                              const allAdded = notYetAdded.length === 0;
                              return (
                                <button
                                  onClick={() => {
                                    if (!allAdded) {
                                      const newUsernames = notYetAdded.map((inf: any) => inf.username);
                                      setAddedFromDiscover([...addedFromDiscover, ...newUsernames]);
                                    }
                                  }}
                                  disabled={allAdded}
                                  className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${
                                    allAdded
                                      ? 'bg-emerald-50 text-emerald-400 border border-emerald-100 cursor-default'
                                      : 'bg-brand-accent text-white shadow-sm hover:bg-brand-accent/90 hover:shadow-md'
                                  }`}
                                >
                                  {allAdded ? (
                                    <>
                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                      All Added
                                    </>
                                  ) : (
                                    <>
                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                                      Add All
                                    </>
                                  )}
                                </button>
                              );
                            })()}
                          </div>

                          {/* Influencer list */}
                          {visibleCollectionResults.length === 0 ? (
                            <div className="text-center py-10">
                              <div className="bg-gray-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                                <SearchIcon className="w-6 h-6 text-gray-400" />
                              </div>
                              <p className="text-[13px] font-semibold text-gray-900">No influencers remaining</p>
                              <p className="text-[12px] text-gray-500 mt-1">All influencers have been dismissed</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {visibleCollectionResults.map((inf: any) => {
                                const isAdded = addedFromDiscover.includes(inf.username);
                                const isExpanded = expandedDiscoverUsername === inf.username;
                                return (
                                  <div key={inf.username} className="flex flex-col">
                                    <div
                                      onClick={() => handleToggleDiscoverExpand(inf.username)}
                                      className={`flex items-center gap-3 p-3 border rounded-xl transition-all cursor-pointer group ${
                                        isExpanded ? 'bg-brand-accent/5 border-brand-accent/30 rounded-b-none' : isAdded ? 'bg-emerald-50/40 border-emerald-200' : 'bg-[#FDFCFB] border-gray-100 hover:border-gray-200'
                                      }`}
                                    >
                                      <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white ring-1 ring-gray-100 shrink-0">
                                        <img src={inf.imageUrl} alt={inf.name} className="w-full h-full object-cover" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <h4 className="text-[13px] font-black text-brand-dark truncate">{inf.name}</h4>
                                          {inf.hasEmail && (
                                            <svg className="w-3.5 h-3.5 text-brand-accent shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-brand-gray mt-0.5">
                                          <span>{inf.flag} {inf.location}</span>
                                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                          <span>{inf.category}</span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1">
                                          <div className="flex items-center gap-1.5">
                                            {inf.platforms.includes('instagram') && <div className="w-3.5 h-3.5"><InstagramIcon /></div>}
                                            {inf.platforms.includes('youtube') && <div className="w-3.5 h-3.5"><YouTubeIcon /></div>}
                                            {inf.platforms.includes('tiktok') && <div className="w-3.5 h-3.5"><TikTokIcon /></div>}
                                          </div>
                                          <span className="text-[10px] font-bold text-brand-gray">{inf.followers}</span>
                                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                          <span className="text-[10px] font-black text-brand-accent">{inf.estimatedValue}</span>
                                        </div>
                                      </div>
                                      <svg className={`w-4 h-4 text-brand-gray shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                      </svg>
                                      <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                                        <button
                                          onClick={() => handleAddInfluencerToCampaign(inf.username)}
                                          disabled={isAdded}
                                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                                            isAdded
                                              ? 'bg-emerald-500 text-white shadow-md cursor-default'
                                              : 'bg-emerald-50 text-emerald-500 border border-emerald-200 hover:bg-emerald-500 hover:text-white hover:shadow-md hover:border-emerald-500'
                                          }`}
                                          title={isAdded ? 'Added to campaign' : 'Add to campaign'}
                                        >
                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                          </svg>
                                        </button>
                                        {!isAdded && (
                                          <button
                                            onClick={() => handleDismissFromDiscover(inf.username)}
                                            className="w-9 h-9 rounded-full flex items-center justify-center bg-red-50 text-red-400 border border-red-200 hover:bg-red-500 hover:text-white hover:shadow-md hover:border-red-500 transition-all"
                                            title="Remove from results"
                                          >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                          </button>
                                        )}
                                      </div>
                                    </div>

                                    {/* Expanded profile section */}
                                    {isExpanded && (
                                      <div className="border border-t-0 border-brand-accent/30 rounded-b-xl bg-[#FDFCFB] animate-in slide-in-from-top-2 fade-in duration-300">
                                        <div className="flex gap-1 px-4 pt-4 pb-3 border-b border-gray-100">
                                          {(['Key Stats', 'Audience', 'Content'] as const).map((tab) => (
                                            <button key={tab} onClick={(e) => { e.stopPropagation(); setDiscoverExpandTab(tab); setDiscoverExpandPost(null); }} className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-wider uppercase transition-all border ${discoverExpandTab === tab ? 'bg-brand-accent text-white border-brand-accent shadow-sm' : 'bg-white text-brand-gray border-gray-200 hover:border-brand-accent/30'}`}>{tab}</button>
                                          ))}
                                        </div>
                                        <div className="p-4">
                                          {discoverExpandTab === 'Key Stats' && (
                                            <div className="space-y-4 animate-in fade-in duration-200">
                                              <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                                                <div className="flex flex-col"><span className="text-[10px] font-black text-brand-gray uppercase tracking-widest opacity-60">Brand Fit</span><span className="text-[13px] font-black text-brand-dark mt-0.5">{inf.category}</span></div>
                                                <div className="flex flex-col"><span className="text-[10px] font-black text-brand-gray uppercase tracking-widest opacity-60">Location</span><span className="text-[13px] font-black text-brand-dark mt-0.5">{inf.flag} {inf.location}, {countryNames[inf.region] || inf.region}</span></div>
                                              </div>
                                              <div className="space-y-2 pt-3 border-t border-gray-100">
                                                <p className="text-[11px] font-black text-brand-dark">Mapkats Badges</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                  <span className="bg-brand-accent text-white px-2.5 py-1 rounded-lg text-[10px] font-bold italic">#{Math.floor(Math.random() * 20) + 1} {inf.category}</span>
                                                  <span className="bg-brand-dark text-white px-2.5 py-1 rounded-lg text-[10px] font-semibold">Top 10 Viewed</span>
                                                  <span className="bg-[#82A3C4] text-white px-2.5 py-1 rounded-lg text-[10px] font-semibold">Top 10 Saved</span>
                                                </div>
                                              </div>
                                              <div className="flex items-center gap-3 p-3 bg-orange-50/40 rounded-xl border border-orange-100/50">
                                                <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/></svg></div>
                                                <div className="flex-1"><p className="text-[9px] font-black text-brand-accent uppercase tracking-widest">Mapkats Ranking</p><p className="text-[12px] font-black text-brand-dark">#{Math.floor(Math.random() * 15) + 1} in <span className="text-brand-accent">{inf.category}</span></p></div>
                                              </div>
                                              <div className="space-y-2 pt-3 border-t border-gray-100">
                                                <p className="text-[10px] font-black text-brand-gray uppercase tracking-widest opacity-60">Recent</p>
                                                {discoverExpandPost && (
                                                  <div className="bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 mb-3">
                                                    <div className="flex">
                                                      <div className="w-[55%] aspect-square max-h-[200px]"><img src={discoverExpandPost.imageUrl} alt="Post" className="w-full h-full object-cover" /></div>
                                                      <div className="w-[45%] p-3 flex flex-col">
                                                        <p className="text-[11px] font-medium text-brand-dark leading-relaxed flex-1 line-clamp-5">{discoverExpandPost.caption}</p>
                                                        <div className="flex items-center gap-4 mt-2 pt-2 border-t border-gray-100">
                                                          <span className="flex items-center gap-1 text-[10px] font-bold text-brand-gray"><svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>{discoverExpandPost.likes.toLocaleString()}</span>
                                                          <span className="flex items-center gap-1 text-[10px] font-bold text-brand-gray"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>{discoverExpandPost.comments}</span>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <button onClick={(e) => { e.stopPropagation(); setDiscoverExpandPost(null); }} className="w-full py-2 text-center text-[10px] font-bold text-brand-gray bg-gray-50 hover:bg-gray-100 transition-colors border-t border-gray-100">Close post</button>
                                                  </div>
                                                )}
                                                <div className="grid grid-cols-6 gap-1.5">
                                                  {discoverRecentPosts.map((post, i) => (
                                                    <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer group relative border border-gray-50" onClick={(e) => { e.stopPropagation(); setDiscoverExpandPost(discoverExpandPost?.imageUrl === post.imageUrl ? null : post); }}>
                                                      <img src={post.imageUrl} alt={`Post ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"><svg className="w-4 h-4 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg></div>
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                          {discoverExpandTab === 'Audience' && (
                                            <div className="space-y-4 animate-in fade-in duration-200">
                                              <div className="space-y-2"><p className="text-[11px] font-black text-brand-dark">Gender</p><div className="space-y-2"><div><div className="flex justify-between items-center mb-1"><p className="text-[10px] font-semibold text-brand-dark">Women {inf.gender === 'Female' ? '58.3%' : '27.9%'}</p></div><div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden"><div className="bg-brand-accent h-full rounded-full" style={{ width: inf.gender === 'Female' ? '58.3%' : '27.9%' }}></div></div></div><div><div className="flex justify-between items-center mb-1"><p className="text-[10px] font-semibold text-brand-dark">Men {inf.gender === 'Female' ? '38.5%' : '68.4%'}</p></div><div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden"><div className="bg-[#82A3C4] h-full rounded-full" style={{ width: inf.gender === 'Female' ? '38.5%' : '68.4%' }}></div></div></div></div></div>
                                              <div className="space-y-2 pt-3 border-t border-gray-100"><p className="text-[11px] font-black text-brand-dark">Top countries</p><div className="flex flex-wrap gap-1.5"><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">{countryNames[inf.region] || inf.region} (42%)</span><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">United States (18%)</span><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">United Kingdom (9%)</span><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">India (4.1%)</span></div></div>
                                              <div className="space-y-2 pt-3 border-t border-gray-100"><p className="text-[11px] font-black text-brand-dark">Top cities</p><div className="flex flex-wrap gap-1.5"><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">{inf.location} (35.2%)</span><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">London (6.8%)</span><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">New York (4.5%)</span><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">Sydney (3.2%)</span></div></div>
                                            </div>
                                          )}
                                          {discoverExpandTab === 'Content' && (
                                            <div className="space-y-4 animate-in fade-in duration-200">
                                              <div className="space-y-2"><p className="text-[11px] font-black text-brand-dark">Format performance (avg engagement)</p><div className="space-y-2"><div><div className="flex justify-between items-center mb-1"><p className="text-[10px] font-semibold text-brand-dark">Photos 4.1%</p></div><div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden"><div className="bg-brand-accent h-full rounded-full" style={{ width: '41%' }}></div></div></div><div><div className="flex justify-between items-center mb-1"><p className="text-[10px] font-semibold text-brand-dark">Reels 2.5%</p></div><div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden"><div className="bg-brand-accent h-full rounded-full" style={{ width: '25%' }}></div></div></div></div></div>
                                              <div className="space-y-2 pt-3 border-t border-gray-100"><p className="text-[11px] font-black text-brand-dark">Top content (last 30 days)</p><div className="flex flex-wrap gap-1.5">{[{ label: 'Avg views', value: '12.4K' },{ label: 'Median views', value: '8.2K' },{ label: 'Saves rate', value: '2.1%' },{ label: 'Share rate', value: '0.8%' }].map((item) => (<span key={item.label} className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">{item.label}: {item.value}</span>))}</div></div>
                                              <div className="space-y-2 pt-3 border-t border-gray-100"><p className="text-[11px] font-black text-brand-dark">Cadence</p><div className="flex flex-wrap gap-1.5">{[{ label: 'Posts', value: '23' },{ label: 'Reels', value: '7' },{ label: 'Stories', value: '12' },{ label: 'Avg posts/week', value: '5' }].map((item) => (<span key={item.label} className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">{item.label}: {item.value}</span>))}</div></div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })()
                  )}
                </div>
              )}

              {discoverTab === 'Add from Campaigns' && (
                <div className="animate-in fade-in duration-200">
                  {!selectedCampaignSource ? (
                    /* Step 1: Campaign list */
                    <div className="space-y-4">
                      <p className="text-[11px] font-bold text-brand-dark">Add from Campaigns</p>
                      <div className="space-y-1">
                        {[
                          { name: 'New Campaign', count: 12 },
                          { name: 'Firelli', count: 34 },
                          { name: 'Starlino Vermouth', count: 28 },
                          { name: 'Starlino', count: 19 },
                          { name: 'Proof Drinks', count: 45 },
                          { name: 'Testing', count: 8 },
                          { name: 'Starlino Brands', count: 22 },
                          { name: 'Starlino LGBT', count: 15 },
                          { name: 'Starlino Ambassadors', count: 31 },
                          { name: "Greg's Malfy Influencers", count: 27 },
                          { name: 'Confirmed Influencers', count: 52 },
                          { name: 'Discover Italia', count: 18 },
                          { name: 'Target List', count: 41 },
                          { name: 'Stambecco', count: 23 },
                        ].map((camp) => (
                          <div
                            key={camp.name}
                            onClick={() => { setSelectedCampaignSource(camp.name); setDiscoverSearched(false); setDiscoverResults([]); setDiscoverFilters({ country: '', state: '', city: '', category: '', gender: '', hasEmail: false, channel: '', favourite: '', audienceFrom: '', audienceTo: '', mediaValueFrom: '', mediaValueTo: '' }); }}
                            className="py-2.5 px-3 text-[13px] font-medium text-brand-dark hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                          >
                            {camp.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Step 2: Filter form for the selected campaign */
                    <div className="space-y-4">
                      {/* Back to campaign list */}
                      <button
                        onClick={() => { setSelectedCampaignSource(null); setDiscoverSearched(false); setDiscoverResults([]); }}
                        className="flex items-center gap-1.5 text-[11px] font-black text-brand-accent hover:underline uppercase tracking-wider"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to campaigns
                      </button>

                      <div className="bg-brand-accent/5 border border-brand-accent/15 rounded-xl px-4 py-3 flex items-center gap-3">
                        <svg className="w-4 h-4 text-brand-accent shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        <span className="text-[12px] font-bold text-brand-dark">Searching within: <span className="text-brand-accent">{selectedCampaignSource}</span></span>
                      </div>

                      {/* Same filter fields */}
                      <div className="space-y-3">
                        <select value={discoverFilters.country} onChange={(e) => setDiscoverFilters({ ...discoverFilters, country: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all">
                          <option value="">All Countries</option>
                          <option value="AU">Australia</option>
                          <option value="FR">France</option>
                          <option value="IN">India</option>
                          <option value="ID">Indonesia</option>
                          <option value="IT">Italy</option>
                          <option value="JP">Japan</option>
                          <option value="NZ">New Zealand</option>
                          <option value="SG">Singapore</option>
                          <option value="KR">South Korea</option>
                          <option value="UK">United Kingdom</option>
                          <option value="US">United States</option>
                          <option value="VN">Vietnam</option>
                        </select>
                        <input type="text" placeholder="State" value={discoverFilters.state} onChange={(e) => setDiscoverFilters({ ...discoverFilters, state: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all" />
                        <input type="text" placeholder="City" value={discoverFilters.city} onChange={(e) => setDiscoverFilters({ ...discoverFilters, city: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all" />
                        <select value={discoverFilters.category} onChange={(e) => setDiscoverFilters({ ...discoverFilters, category: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all">
                          <option value="">Select Category</option>
                          <option value="Food">Food</option>
                          <option value="Lifestyle Media">Lifestyle Media</option>
                          <option value="Wellness Lifestyle">Wellness Lifestyle</option>
                          <option value="Celebrity">Celebrity</option>
                          <option value="Home Cooking">Home Cooking</option>
                          <option value="Ceramic Art">Ceramic Art</option>
                        </select>
                        <select value={discoverFilters.gender} onChange={(e) => setDiscoverFilters({ ...discoverFilters, gender: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all">
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <label className="flex items-center gap-2.5 py-1 px-1 cursor-pointer">
                          <input type="checkbox" checked={discoverFilters.hasEmail} onChange={(e) => setDiscoverFilters({ ...discoverFilters, hasEmail: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent" />
                          <span className="text-[12px] font-semibold text-brand-dark">Has Email</span>
                        </label>
                        <div className="h-px bg-gray-100" />
                        <select value={discoverFilters.channel} onChange={(e) => setDiscoverFilters({ ...discoverFilters, channel: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all">
                          <option value="">Channel</option>
                          <option value="instagram">Instagram</option>
                          <option value="youtube">YouTube</option>
                          <option value="tiktok">TikTok</option>
                        </select>
                        <select value={discoverFilters.favourite} onChange={(e) => setDiscoverFilters({ ...discoverFilters, favourite: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all">
                          <option value="">Favourite</option>
                          <option value="yes">Favourites Only</option>
                        </select>
                        <div className="h-px bg-gray-100" />
                        <div>
                          <p className="text-[11px] font-bold text-brand-dark mb-2">Audience</p>
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="From" value={discoverFilters.audienceFrom} onChange={(e) => setDiscoverFilters({ ...discoverFilters, audienceFrom: e.target.value })} className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all" />
                            <input type="text" placeholder="To" value={discoverFilters.audienceTo} onChange={(e) => setDiscoverFilters({ ...discoverFilters, audienceTo: e.target.value })} className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all" />
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-brand-dark mb-2">Media Value</p>
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="From" value={discoverFilters.mediaValueFrom} onChange={(e) => setDiscoverFilters({ ...discoverFilters, mediaValueFrom: e.target.value })} className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all" />
                            <input type="text" placeholder="To" value={discoverFilters.mediaValueTo} onChange={(e) => setDiscoverFilters({ ...discoverFilters, mediaValueTo: e.target.value })} className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all" />
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => { setSelectedCampaignSource(null); setDiscoverSearched(false); setDiscoverResults([]); }}
                          className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold text-[11px] rounded-xl hover:bg-gray-200 transition-all uppercase tracking-wider"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleDiscoverSearch}
                          className="px-8 py-2.5 bg-brand-accent text-white font-black text-[11px] rounded-xl hover:brightness-110 transition-all shadow-md uppercase tracking-wider"
                        >
                          Search
                        </button>
                      </div>

                      {/* Results */}
                      {discoverSearched && (() => {
                        const visibleResults = discoverResults.filter(inf => !dismissedFromDiscover.includes(inf.username));
                        const paginatedResults = visibleResults.slice(0, discoverVisibleCount);
                        const hasMore = paginatedResults.length < visibleResults.length;
                        return (
                        <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] font-black text-brand-dark uppercase tracking-widest">
                              {visibleResults.length} Result{visibleResults.length !== 1 ? 's' : ''} Found
                            </p>
                            {addedFromDiscover.length > 0 && (
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                {addedFromDiscover.length} added to campaign
                              </span>
                            )}
                          </div>
                          {visibleResults.length === 0 ? (
                            <div className="text-center py-10">
                              <div className="bg-gray-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                                <SearchIcon className="w-6 h-6 text-gray-400" />
                              </div>
                              <p className="text-[13px] font-semibold text-gray-900">No influencers found</p>
                              <p className="text-[12px] text-gray-500 mt-1">Try adjusting your filters</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {paginatedResults.map((inf: any) => {
                                const isAdded = addedFromDiscover.includes(inf.username);
                                const isExpanded = expandedDiscoverUsername === inf.username;
                                return (
                                  <div key={inf.username} className="flex flex-col">
                                    <div
                                      onClick={() => handleToggleDiscoverExpand(inf.username)}
                                      className={`flex items-center gap-3 p-3 border rounded-xl transition-all cursor-pointer group ${
                                        isExpanded ? 'bg-brand-accent/5 border-brand-accent/30 rounded-b-none' : isAdded ? 'bg-emerald-50/40 border-emerald-200' : 'bg-[#FDFCFB] border-gray-100 hover:border-gray-200'
                                      }`}
                                    >
                                      <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white ring-1 ring-gray-100 shrink-0">
                                        <img src={inf.imageUrl} alt={inf.name} className="w-full h-full object-cover" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <h4 className="text-[13px] font-black text-brand-dark truncate">{inf.name}</h4>
                                          {inf.hasEmail && (
                                            <svg className="w-3.5 h-3.5 text-brand-accent shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-brand-gray mt-0.5">
                                          <span>{inf.flag} {inf.location}</span>
                                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                          <span>{inf.category}</span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1">
                                          <div className="flex items-center gap-1.5">
                                            {inf.platforms.includes('instagram') && <div className="w-3.5 h-3.5"><InstagramIcon /></div>}
                                            {inf.platforms.includes('youtube') && <div className="w-3.5 h-3.5"><YouTubeIcon /></div>}
                                            {inf.platforms.includes('tiktok') && <div className="w-3.5 h-3.5"><TikTokIcon /></div>}
                                          </div>
                                          <span className="text-[10px] font-bold text-brand-gray">{inf.followers}</span>
                                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                          <span className="text-[10px] font-black text-brand-accent">{inf.estimatedValue}</span>
                                        </div>
                                      </div>
                                      <svg className={`w-4 h-4 text-brand-gray shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                      </svg>
                                      <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                                        <button
                                          onClick={() => handleAddInfluencerToCampaign(inf.username)}
                                          disabled={isAdded}
                                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                                            isAdded
                                              ? 'bg-emerald-500 text-white shadow-md cursor-default'
                                              : 'bg-emerald-50 text-emerald-500 border border-emerald-200 hover:bg-emerald-500 hover:text-white hover:shadow-md hover:border-emerald-500'
                                          }`}
                                          title={isAdded ? 'Added to campaign' : 'Add to campaign'}
                                        >
                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                          </svg>
                                        </button>
                                        {!isAdded && (
                                          <button
                                            onClick={() => handleDismissFromDiscover(inf.username)}
                                            className="w-9 h-9 rounded-full flex items-center justify-center bg-red-50 text-red-400 border border-red-200 hover:bg-red-500 hover:text-white hover:shadow-md hover:border-red-500 transition-all"
                                            title="Remove from results"
                                          >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                          </button>
                                        )}
                                      </div>
                                    </div>

                                    {/* Expanded profile section — same as Search Database */}
                                    {isExpanded && (
                                      <div className="border border-t-0 border-brand-accent/30 rounded-b-xl bg-[#FDFCFB] animate-in slide-in-from-top-2 fade-in duration-300">
                                        <div className="flex gap-1 px-4 pt-4 pb-3 border-b border-gray-100">
                                          {(['Key Stats', 'Audience', 'Content'] as const).map((tab) => (
                                            <button key={tab} onClick={(e) => { e.stopPropagation(); setDiscoverExpandTab(tab); setDiscoverExpandPost(null); }} className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-wider uppercase transition-all border ${discoverExpandTab === tab ? 'bg-brand-accent text-white border-brand-accent shadow-sm' : 'bg-white text-brand-gray border-gray-200 hover:border-brand-accent/30'}`}>{tab}</button>
                                          ))}
                                        </div>
                                        <div className="p-4">
                                          {discoverExpandTab === 'Key Stats' && (
                                            <div className="space-y-4 animate-in fade-in duration-200">
                                              <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                                                <div className="flex flex-col"><span className="text-[10px] font-black text-brand-gray uppercase tracking-widest opacity-60">Brand Fit</span><span className="text-[13px] font-black text-brand-dark mt-0.5">{inf.category}</span></div>
                                                <div className="flex flex-col"><span className="text-[10px] font-black text-brand-gray uppercase tracking-widest opacity-60">Location</span><span className="text-[13px] font-black text-brand-dark mt-0.5">{inf.flag} {inf.location}, {countryNames[inf.region] || inf.region}</span></div>
                                              </div>
                                              <div className="space-y-2 pt-3 border-t border-gray-100">
                                                <p className="text-[11px] font-black text-brand-dark">Mapkats Badges</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                  <span className="bg-brand-accent text-white px-2.5 py-1 rounded-lg text-[10px] font-bold italic">#{Math.floor(Math.random() * 20) + 1} {inf.category}</span>
                                                  <span className="bg-brand-dark text-white px-2.5 py-1 rounded-lg text-[10px] font-semibold">Top 10 Viewed</span>
                                                  <span className="bg-[#82A3C4] text-white px-2.5 py-1 rounded-lg text-[10px] font-semibold">Top 10 Saved</span>
                                                </div>
                                              </div>
                                              <div className="flex items-center gap-3 p-3 bg-orange-50/40 rounded-xl border border-orange-100/50">
                                                <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/></svg></div>
                                                <div className="flex-1"><p className="text-[9px] font-black text-brand-accent uppercase tracking-widest">Mapkats Ranking</p><p className="text-[12px] font-black text-brand-dark">#{Math.floor(Math.random() * 15) + 1} in <span className="text-brand-accent">{inf.category}</span></p></div>
                                              </div>
                                              <div className="space-y-2 pt-3 border-t border-gray-100">
                                                <p className="text-[10px] font-black text-brand-gray uppercase tracking-widest opacity-60">Recent</p>
                                                {discoverExpandPost && (
                                                  <div className="bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 mb-3">
                                                    <div className="flex">
                                                      <div className="w-[55%] aspect-square max-h-[200px]"><img src={discoverExpandPost.imageUrl} alt="Post" className="w-full h-full object-cover" /></div>
                                                      <div className="w-[45%] p-3 flex flex-col">
                                                        <p className="text-[11px] font-medium text-brand-dark leading-relaxed flex-1 line-clamp-5">{discoverExpandPost.caption}</p>
                                                        <div className="flex items-center gap-4 mt-2 pt-2 border-t border-gray-100">
                                                          <span className="flex items-center gap-1 text-[10px] font-bold text-brand-gray"><svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>{discoverExpandPost.likes.toLocaleString()}</span>
                                                          <span className="flex items-center gap-1 text-[10px] font-bold text-brand-gray"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>{discoverExpandPost.comments}</span>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <button onClick={(e) => { e.stopPropagation(); setDiscoverExpandPost(null); }} className="w-full py-2 text-center text-[10px] font-bold text-brand-gray bg-gray-50 hover:bg-gray-100 transition-colors border-t border-gray-100">Close post</button>
                                                  </div>
                                                )}
                                                <div className="grid grid-cols-6 gap-1.5">
                                                  {discoverRecentPosts.map((post, i) => (
                                                    <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer group relative border border-gray-50" onClick={(e) => { e.stopPropagation(); setDiscoverExpandPost(discoverExpandPost?.imageUrl === post.imageUrl ? null : post); }}>
                                                      <img src={post.imageUrl} alt={`Post ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"><svg className="w-4 h-4 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg></div>
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                          {discoverExpandTab === 'Audience' && (
                                            <div className="space-y-4 animate-in fade-in duration-200">
                                              <div className="space-y-2"><p className="text-[11px] font-black text-brand-dark">Gender</p><div className="space-y-2"><div><div className="flex justify-between items-center mb-1"><p className="text-[10px] font-semibold text-brand-dark">Women {inf.gender === 'Female' ? '58.3%' : '27.9%'}</p></div><div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden"><div className="bg-brand-accent h-full rounded-full" style={{ width: inf.gender === 'Female' ? '58.3%' : '27.9%' }}></div></div></div><div><div className="flex justify-between items-center mb-1"><p className="text-[10px] font-semibold text-brand-dark">Men {inf.gender === 'Female' ? '38.5%' : '68.4%'}</p></div><div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden"><div className="bg-[#82A3C4] h-full rounded-full" style={{ width: inf.gender === 'Female' ? '38.5%' : '68.4%' }}></div></div></div></div></div>
                                              <div className="space-y-2 pt-3 border-t border-gray-100"><p className="text-[11px] font-black text-brand-dark">Top countries</p><div className="flex flex-wrap gap-1.5"><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">{countryNames[inf.region] || inf.region} (42%)</span><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">United States (18%)</span><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">United Kingdom (9%)</span><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">India (4.1%)</span></div></div>
                                              <div className="space-y-2 pt-3 border-t border-gray-100"><p className="text-[11px] font-black text-brand-dark">Top cities</p><div className="flex flex-wrap gap-1.5"><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">{inf.location} (35.2%)</span><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">London (6.8%)</span><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">New York (4.5%)</span><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">Sydney (3.2%)</span></div></div>
                                            </div>
                                          )}
                                          {discoverExpandTab === 'Content' && (
                                            <div className="space-y-4 animate-in fade-in duration-200">
                                              <div className="space-y-2"><p className="text-[11px] font-black text-brand-dark">Format performance (avg engagement)</p><div className="space-y-2"><div><div className="flex justify-between items-center mb-1"><p className="text-[10px] font-semibold text-brand-dark">Photos 4.1%</p></div><div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden"><div className="bg-brand-accent h-full rounded-full" style={{ width: '41%' }}></div></div></div><div><div className="flex justify-between items-center mb-1"><p className="text-[10px] font-semibold text-brand-dark">Reels 2.5%</p></div><div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden"><div className="bg-brand-accent h-full rounded-full" style={{ width: '25%' }}></div></div></div></div></div>
                                              <div className="space-y-2 pt-3 border-t border-gray-100"><p className="text-[11px] font-black text-brand-dark">Top content (last 30 days)</p><div className="flex flex-wrap gap-1.5">{[{ label: 'Avg views', value: '12.4K' },{ label: 'Median views', value: '8.2K' },{ label: 'Saves rate', value: '2.1%' },{ label: 'Share rate', value: '0.8%' }].map((item) => (<span key={item.label} className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">{item.label}: {item.value}</span>))}</div></div>
                                              <div className="space-y-2 pt-3 border-t border-gray-100"><p className="text-[11px] font-black text-brand-dark">Cadence</p><div className="flex flex-wrap gap-1.5">{[{ label: 'Posts', value: '23' },{ label: 'Reels', value: '7' },{ label: 'Stories', value: '12' },{ label: 'Avg posts/week', value: '5' }].map((item) => (<span key={item.label} className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">{item.label}: {item.value}</span>))}</div></div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                              {hasMore && (
                                <div className="pt-3 pb-1">
                                  <button
                                    onClick={() => setDiscoverVisibleCount(discoverVisibleCount + 20)}
                                    className="w-full py-3 text-center text-[11px] font-bold text-brand-accent bg-brand-accent/5 border border-brand-accent/15 rounded-xl hover:bg-brand-accent/10 transition-all"
                                  >
                                    Load more ({visibleResults.length - paginatedResults.length} remaining)
                                  </button>
                                </div>
                              )}
                              {!hasMore && visibleResults.length > 0 && (
                                <p className="text-center text-[10px] font-bold text-gray-400 pt-3 uppercase tracking-widest">
                                  End of results
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-100 text-[11px] font-bold text-brand-gray">
         <div className="flex items-center gap-6">
            <span className="uppercase tracking-widest opacity-60">SHOWING {influencers.length} OF 721 RESULTS</span>
            <div className="flex items-center gap-2">
               <span className="cursor-pointer hover:text-brand-accent">20</span>
               <span className="bg-brand-accent text-white px-2.5 py-1 rounded shadow-sm">50</span>
               <span className="cursor-pointer hover:text-brand-accent">100</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <button className="opacity-40 hover:opacity-100 transition-opacity">PREVIOUS</button>
            <div className="flex gap-2">
              <span className="bg-brand-accent text-white px-2.5 py-1 rounded shadow-sm">1</span>
              <span className="px-2.5 py-1 cursor-pointer hover:bg-gray-100 rounded transition-all">2</span>
              <span className="px-2.5 py-1 cursor-pointer hover:bg-gray-100 rounded transition-all">3</span>
              <span className="px-2.5 py-1 cursor-pointer hover:bg-gray-100 rounded transition-all">4</span>
            </div>
            <button className="hover:text-brand-accent transition-colors">NEXT</button>
         </div>
      </div>
    </div>
  );
};

// Sub-component for individual influencer cards (Profiles Grid)
const InfluencerProfileCard: React.FC<any> = ({ name, username, imageUrl, category, audience, value, location, flag, platforms, platformStats, isFavourite, isGeocoded, followers, estimatedValue, posts, stories, email, onAssign, onRemove }) => {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Media': return 'bg-[#00529B]';
      case 'Wellness Lifestyle': return 'bg-[#1A1E4B]';
      case 'Home Cooking': return 'bg-[#8B4513]';
      case 'Lifestyle Media': return 'bg-[#D6249F]';
      case 'Celebrity': return 'bg-purple-700';
      case 'Food': return 'bg-orange-600';
      default: return 'bg-brand-dark/80';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden group hover:shadow-panel transition-all hover:-translate-y-1 h-full flex flex-col">
      {/* Image area */}
      <div className="relative h-64 bg-gray-100">
         <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>

         {/* Top-left: platform icon + post/story counters */}
         <div className="absolute top-3 left-3 flex flex-col gap-1">
            <div className="w-7 h-7 bg-white/90 rounded-lg p-1.5 shadow-sm">
              <InstagramIcon />
            </div>
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[10px] text-white font-black">{posts || 0}</div>
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-black">{stories || 0}</div>
         </div>

         {/* Top-right: status badge */}
         <div className="absolute top-3 right-3">
            <span className="bg-white text-brand-dark text-[9px] font-black px-2 py-1 rounded-md tracking-wider uppercase shadow-sm">NEW</span>
         </div>

         {/* Bottom: category pill */}
         <div className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-center">
            <div className={`${getCategoryColor(category)} backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 text-white shadow-lg`}>
               <span className="text-xl">{flag || '🇦🇺'}</span>
               <span className="text-[10px] font-black uppercase tracking-widest">{category}</span>
            </div>
         </div>
      </div>

      {/* Card body */}
      <div className="p-5 space-y-4 flex-1 flex flex-col">
         {/* Name row */}
         <div className="flex items-center justify-between">
            <div className="space-y-0.5 min-w-0">
               <h3 className="text-sm font-black text-brand-accent hover:underline cursor-pointer truncate">{name}</h3>
               <p className="text-[11px] font-bold text-brand-dark opacity-60">@{username}</p>
               {location && (
                 <div className="flex items-center gap-1 mt-0.5">
                   <svg className="w-3 h-3 text-brand-gray" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                   </svg>
                   <span className="text-[10px] font-semibold text-brand-gray">{location}</span>
                 </div>
               )}
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
               <button className={`${isFavourite ? 'text-amber-400' : 'text-gray-300'} hover:text-amber-400 transition-colors`} onClick={(e) => e.stopPropagation()}>
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
               </button>
               <button
                 className={`transition-colors ${email ? 'text-emerald-500 hover:text-emerald-600' : 'text-gray-300 hover:text-gray-400'}`}
                 onClick={(e) => e.stopPropagation()}
                 title={email || 'No email'}
               >
                 {email ? (
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /></svg>
                 ) : (
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                 )}
               </button>
            </div>
         </div>

         {/* Total Audience section */}
         <div className="pt-3 border-t border-gray-50 space-y-2">
            <p className="text-[9px] font-black text-brand-gray uppercase tracking-widest">Total Audience</p>
            <div className="flex items-baseline gap-1">
               <span className="text-lg font-black text-brand-dark">{followers || audience}</span>
               <span className="text-[10px] font-bold text-brand-gray">followers</span>
            </div>
            <p className="text-[12px] font-bold text-brand-accent">{estimatedValue || `$${value}`} <span className="text-brand-gray font-semibold">Estimated Value</span></p>
         </div>

         {/* Social platform icons with hover stats */}
         <div className="flex items-center gap-2 pt-1">
            {(platforms || ['instagram']).includes('instagram') && (
              <div
                className="relative"
                onMouseEnter={() => setHoveredPlatform('instagram')}
                onMouseLeave={() => setHoveredPlatform(null)}
              >
                <div className="w-6 h-6 rounded-md overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
                  <InstagramIcon />
                </div>
                {hoveredPlatform === 'instagram' && platformStats?.instagram && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 whitespace-nowrap z-20">
                    <p className="text-[13px] font-black text-brand-dark">{platformStats.instagram.followers} followers</p>
                    <p className="text-[12px] font-bold text-brand-dark">{platformStats.instagram.value} Estimated Value</p>
                    <div className="absolute top-full left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
                  </div>
                )}
              </div>
            )}
            {(platforms || []).includes('youtube') && (
              <div
                className="relative"
                onMouseEnter={() => setHoveredPlatform('youtube')}
                onMouseLeave={() => setHoveredPlatform(null)}
              >
                <div className="w-6 h-6 rounded-md overflow-hidden shadow-sm border border-gray-100 bg-white flex items-center justify-center p-0.5 cursor-pointer hover:shadow-md transition-shadow">
                  <YouTubeIcon />
                </div>
                {hoveredPlatform === 'youtube' && platformStats?.youtube && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 whitespace-nowrap z-20">
                    <p className="text-[13px] font-black text-brand-dark">{platformStats.youtube.followers} followers</p>
                    <p className="text-[12px] font-bold text-brand-dark">{platformStats.youtube.value} Estimated Value</p>
                    <div className="absolute top-full left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
                  </div>
                )}
              </div>
            )}
            {(platforms || []).includes('tiktok') && (
              <div
                className="relative"
                onMouseEnter={() => setHoveredPlatform('tiktok')}
                onMouseLeave={() => setHoveredPlatform(null)}
              >
                <div className="w-6 h-6 rounded-md overflow-hidden shadow-sm border border-gray-100 bg-white flex items-center justify-center p-1 cursor-pointer hover:shadow-md transition-shadow">
                  <TikTokIcon />
                </div>
                {hoveredPlatform === 'tiktok' && platformStats?.tiktok && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 whitespace-nowrap z-20">
                    <p className="text-[13px] font-black text-brand-dark">{platformStats.tiktok.followers} followers</p>
                    <p className="text-[12px] font-bold text-brand-dark">{platformStats.tiktok.value} Estimated Value</p>
                    <div className="absolute top-full left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
                  </div>
                )}
              </div>
            )}
         </div>

         {/* Spacer to push action bar to bottom */}
         <div className="flex-1" />

         {/* Action bar: map pin, assign, delete, refresh */}
         <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
            {/* Map pin — green = geocoded, red = not */}
            <button
              className={`p-2 rounded-lg transition-all ${isGeocoded ? 'text-emerald-500 hover:bg-emerald-50' : 'text-red-500 hover:bg-red-50'}`}
              title={isGeocoded ? 'Location geocoded' : 'Location not geocoded'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* Assign to another campaign */}
            <button
              className="p-2 rounded-lg text-emerald-500 hover:bg-emerald-50 transition-all"
              title="Assign to campaign"
              onClick={() => onAssign?.(username)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>

            {/* Remove from campaign */}
            <button
              className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
              title="Remove from campaign"
              onClick={() => onRemove?.(username)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>

            {/* Refresh / sync */}
            <button
              className="p-2 rounded-lg text-gray-400 hover:text-brand-accent hover:bg-gray-50 transition-all"
              title="Refresh data"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
         </div>
      </div>
    </div>
  );
};

// ─── Donut Chart (Untitled UI style) ────────────────────────────────────────
interface PieSlice { label: string; value: number; color: string }

const DonutChart: React.FC<{ data: PieSlice[]; size?: number; centerLabel?: string; centerValue?: string }> = ({ data, size = 200, centerLabel, centerValue }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return null;
  const r = size / 2;
  const outerR = r * 0.88;
  const innerR = r * 0.62;
  let cum = 0;

  const arcPath = (startAngle: number, endAngle: number) => {
    const s = (startAngle - 90) * Math.PI / 180;
    const e = (endAngle - 90) * Math.PI / 180;
    const large = endAngle - startAngle > 180 ? 1 : 0;
    const ox1 = r + outerR * Math.cos(s), oy1 = r + outerR * Math.sin(s);
    const ox2 = r + outerR * Math.cos(e), oy2 = r + outerR * Math.sin(e);
    const ix1 = r + innerR * Math.cos(e), iy1 = r + innerR * Math.sin(e);
    const ix2 = r + innerR * Math.cos(s), iy2 = r + innerR * Math.sin(s);
    return `M ${ox1} ${oy1} A ${outerR} ${outerR} 0 ${large} 1 ${ox2} ${oy2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${large} 0 ${ix2} ${iy2} Z`;
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        {data.map((slice, i) => {
          const angle = Math.max((slice.value / total) * 360, 0.5);
          const gap = data.length > 1 ? 1.5 : 0;
          const startAngle = cum + gap / 2;
          cum += angle;
          return <path key={i} d={arcPath(startAngle, startAngle + angle - gap)} fill={slice.color} className="transition-opacity hover:opacity-80" />;
        })}
      </svg>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && <span className="text-lg font-bold text-gray-900">{centerValue}</span>}
          {centerLabel && <span className="text-[10px] font-medium text-gray-500">{centerLabel}</span>}
        </div>
      )}
    </div>
  );
};

const ChartLegend: React.FC<{ data: PieSlice[]; total?: number }> = ({ data, total }) => {
  const t = total ?? data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="space-y-2 mt-4 w-full">
      {data.map((d, i) => (
        <div key={i} className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
            <span className="text-[12px] text-gray-700 truncate">{d.label}</span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-[12px] font-semibold text-gray-900">{d.value.toLocaleString()}</span>
            {t > 0 && <span className="text-[11px] text-gray-400 w-10 text-right">{((d.value / t) * 100).toFixed(0)}%</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Area Line Chart (Untitled UI style) ─────────────────────────────────────
interface LineChartPoint { label: string; newVal: number; requestedVal: number; confirmedVal: number }

const AreaLineChart: React.FC<{ data: LineChartPoint[] }> = ({ data }) => {
  const w = 720, h = 280, px = 48, py = 24;
  const cw = w - px * 2, ch = h - py * 2;
  const allVals = data.flatMap(d => [d.newVal, d.requestedVal, d.confirmedVal]);
  const maxVal = Math.max(...allVals, 10);
  const yTicks = [0, Math.round(maxVal * 0.25), Math.round(maxVal * 0.5), Math.round(maxVal * 0.75), maxVal];

  const toX = (i: number) => px + (i / (data.length - 1)) * cw;
  const toY = (v: number) => py + ch - (v / maxVal) * ch;

  const lines: { key: keyof LineChartPoint; color: string; label: string }[] = [
    { key: 'newVal', color: '#7C3AED', label: 'New' },
    { key: 'requestedVal', color: '#F59E0B', label: 'Requested' },
    { key: 'confirmedVal', color: '#10B981', label: 'Confirmed' },
  ];

  const makeArea = (key: keyof LineChartPoint, color: string) => {
    const pts = data.map((d, i) => `${toX(i)},${toY(d[key] as number)}`).join(' ');
    const bottom = `${toX(data.length - 1)},${toY(0)} ${toX(0)},${toY(0)}`;
    return <polygon key={`area-${key}`} points={`${pts} ${bottom}`} fill={color} fillOpacity="0.06" />;
  };

  const makeLine = (key: keyof LineChartPoint, color: string) => {
    const pts = data.map((d, i) => `${toX(i)},${toY(d[key] as number)}`).join(' ');
    return <polyline key={key} points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />;
  };

  const makeDots = (key: keyof LineChartPoint, color: string) => (
    data.map((d, i) => <circle key={`${key}-${i}`} cx={toX(i)} cy={toY(d[key] as number)} r="3" fill="white" stroke={color} strokeWidth="2" />)
  );

  return (
    <div className="space-y-3">
      {/* Legend */}
      <div className="flex items-center gap-5 px-1">
        {lines.map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
            <span className="text-[11px] font-medium text-gray-500">{l.label}</span>
          </div>
        ))}
      </div>
      <div className="w-full overflow-x-auto scrollbar-hide">
        <svg viewBox={`0 0 ${w} ${h + 24}`} className="w-full min-w-[600px]" preserveAspectRatio="xMidYMid meet">
          {/* Grid */}
          {yTicks.map((t, i) => (
            <g key={i}>
              <line x1={px} y1={toY(t)} x2={w - px} y2={toY(t)} stroke="#F2F4F7" strokeWidth="1" />
              <text x={px - 10} y={toY(t) + 4} textAnchor="end" fontSize="10" fill="#98A2B3" fontWeight="500">{t}</text>
            </g>
          ))}
          {/* Areas */}
          {lines.map((l) => makeArea(l.key, l.color))}
          {/* Lines */}
          {lines.map((l) => makeLine(l.key, l.color))}
          {/* Dots */}
          {lines.map((l) => makeDots(l.key, l.color))}
          {/* X labels */}
          {data.map((d, i) => (
            <text key={i} x={toX(i)} y={h + 16} textAnchor="middle" fontSize="9" fill="#98A2B3" fontWeight="500">{d.label}</text>
          ))}
        </svg>
      </div>
    </div>
  );
};

// ─── Tab Group (Untitled UI style) ───────────────────────────────────────────
const TabGroup: React.FC<{ items: string[]; active: string; onChange: (v: string) => void; size?: 'sm' | 'md' }> = ({ items, active, onChange, size = 'md' }) => (
  <div className="inline-flex items-center bg-gray-50 p-1 rounded-lg border border-gray-200">
    {items.map((f) => (
      <button
        key={f}
        onClick={() => onChange(f)}
        className={`${size === 'sm' ? 'px-3 py-1.5 text-[11px]' : 'px-4 py-2 text-[12px]'} font-medium rounded-md transition-all ${
          active === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        {f}
      </button>
    ))}
  </div>
);

// ─── Status Pill Group ──────────────────────────────────────────────────────
const StatusPillGroup: React.FC<{ active: string; onChange: (v: string) => void }> = ({ active, onChange }) => (
  <div className="flex items-center gap-2">
    {[
      { key: 'NEW', color: 'bg-blue-50 text-blue-700 border-blue-200', activeColor: 'bg-blue-600 text-white border-blue-600' },
      { key: 'REQUESTED', color: 'bg-amber-50 text-amber-700 border-amber-200', activeColor: 'bg-amber-500 text-white border-amber-500' },
      { key: 'CONFIRMED', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', activeColor: 'bg-emerald-600 text-white border-emerald-600' },
    ].map((s) => (
      <button
        key={s.key}
        onClick={() => onChange(s.key)}
        className={`px-4 py-2 text-[11px] font-semibold rounded-full transition-all border ${
          active === s.key ? s.activeColor : s.color
        }`}
      >
        {s.key.charAt(0) + s.key.slice(1).toLowerCase()}
      </button>
    ))}
  </div>
);

// ─── Stat Card ──────────────────────────────────────────────────────────────
const StatCard: React.FC<{ value: string; label: string; trend?: string }> = ({ value, label, trend }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5">
    <p className="text-[12px] font-medium text-gray-500 mb-1">{label}</p>
    <div className="flex items-baseline gap-2">
      <p className="text-2xl font-semibold text-gray-900 tracking-tight">{value}</p>
      {trend && <span className="text-[11px] font-medium text-emerald-600">{trend}</span>}
    </div>
  </div>
);

// ─── Chart Card with Toggle ─────────────────────────────────────────────────
const ChartCard: React.FC<{ title: string; data: PieSlice[]; showTable: boolean; onToggle: () => void; tableColumns: [string, string]; centerLabel?: string }> = ({ title, data, showTable, onToggle, tableColumns, centerLabel }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="flex-1 min-w-[260px] bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <h4 className="text-[13px] font-semibold text-gray-900">{title}</h4>
        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 p-0.5">
          <button onClick={onToggle} className={`p-1.5 rounded-md transition-all ${!showTable ? 'bg-white shadow-sm text-gray-700' : 'text-gray-400 hover:text-gray-600'}`}>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 3v9l6.36 3.64" /></svg>
          </button>
          <button onClick={onToggle} className={`p-1.5 rounded-md transition-all ${showTable ? 'bg-white shadow-sm text-gray-700' : 'text-gray-400 hover:text-gray-600'}`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" d="M3 6h18M3 10h18M3 14h18M3 18h18" /></svg>
          </button>
        </div>
      </div>
      {!showTable ? (
        <div className="flex flex-col items-center">
          <DonutChart data={data} size={180} centerValue={total.toLocaleString()} centerLabel={centerLabel || 'Total'} />
          <ChartLegend data={data} total={total} />
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2.5 text-[11px] font-medium text-gray-500">{tableColumns[0]}</th>
                <th className="px-4 py-2.5 text-[11px] font-medium text-gray-500 text-right">{tableColumns[1]}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((d, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2.5 text-[12px] text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                    {d.label}
                  </td>
                  <td className="px-4 py-2.5 text-[12px] font-medium text-gray-900 text-right">{d.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// INSIGHTS VIEW (Untitled UI design)
// ═══════════════════════════════════════════════════════════════════════════
const InsightsView: React.FC = () => {
  const [overviewTimeFilter, setOverviewTimeFilter] = useState('Lifetime');
  const [perfTimeFilter, setPerfTimeFilter] = useState('Lifetime');
  const [overviewStatus, setOverviewStatus] = useState('NEW');
  const [perfStatus, setPerfStatus] = useState('NEW');
  const [perfTab, setPerfTab] = useState('Media Value');
  const [perfView, setPerfView] = useState('Influencer');

  const [showCountryTable1, setShowCountryTable1] = useState(false);
  const [showCategoryTable1, setShowCategoryTable1] = useState(false);
  const [showRegionTable1, setShowRegionTable1] = useState(false);
  const [showCountryTable2, setShowCountryTable2] = useState(false);
  const [showCategoryTable2, setShowCategoryTable2] = useState(false);
  const [showRegionTable2, setShowRegionTable2] = useState(false);
  const [showPerfPieTable, setShowPerfPieTable] = useState(false);

  // ── Mock Data ──
  const lineChartData: LineChartPoint[] = [
    { label: 'Dec 24', newVal: 10, requestedVal: 5, confirmedVal: 2 },
    { label: 'Jan 25', newVal: 380, requestedVal: 10, confirmedVal: 5 },
    { label: 'Feb', newVal: 410, requestedVal: 15, confirmedVal: 8 },
    { label: 'Mar', newVal: 400, requestedVal: 12, confirmedVal: 6 },
    { label: 'Apr', newVal: 390, requestedVal: 8, confirmedVal: 3 },
    { label: 'May', newVal: 300, requestedVal: 5, confirmedVal: 2 },
    { label: 'Jun', newVal: 680, requestedVal: 30, confirmedVal: 15 },
    { label: 'Jul', newVal: 450, requestedVal: 50, confirmedVal: 25 },
    { label: 'Aug', newVal: 500, requestedVal: 40, confirmedVal: 20 },
    { label: 'Sep', newVal: 50, requestedVal: 10, confirmedVal: 5 },
    { label: 'Oct', newVal: 20, requestedVal: 5, confirmedVal: 2 },
    { label: 'Nov', newVal: 15, requestedVal: 3, confirmedVal: 1 },
    { label: 'Dec', newVal: 10, requestedVal: 2, confirmedVal: 1 },
    { label: 'Jan 26', newVal: 30, requestedVal: 5, confirmedVal: 3 },
    { label: 'Feb', newVal: 8, requestedVal: 2, confirmedVal: 1 },
  ];

  const overviewCountryData: PieSlice[] = [
    { label: 'Australia', value: 2552, color: '#7C3AED' },
    { label: 'United States', value: 719, color: '#F59E0B' },
    { label: 'No country', value: 27, color: '#D1D5DB' },
    { label: 'United Kingdom', value: 1, color: '#10B981' },
    { label: 'Canada', value: 1, color: '#EF4444' },
  ];

  const overviewCategoryData: PieSlice[] = [
    { label: 'Mum Lifestyle', value: 679, color: '#7C3AED' },
    { label: 'Family Lifestyle', value: 591, color: '#F59E0B' },
    { label: 'Healthy Lifestyle', value: 532, color: '#10B981' },
    { label: 'Wellness Lifestyle', value: 523, color: '#3B82F6' },
    { label: 'Nutritionist', value: 452, color: '#EF4444' },
    { label: 'Dietitian', value: 113, color: '#EC4899' },
    { label: 'Vegan', value: 104, color: '#8B5CF6' },
    { label: 'Lifestyle Fitness', value: 32, color: '#06B6D4' },
    { label: 'No category', value: 11, color: '#D1D5DB' },
    { label: 'Asian Lifestyle', value: 2, color: '#14B8A6' },
    { label: 'Brand', value: 1, color: '#6B7280' },
  ];

  const overviewRegionData: PieSlice[] = [
    { label: 'Australia', value: 2499, color: '#10B981' },
    { label: 'Wellness Lifestyle', value: 523, color: '#F59E0B' },
    { label: 'Healthy Lifestyle', value: 532, color: '#7C3AED' },
  ];

  const perfCountryData: PieSlice[] = [
    { label: 'Australia', value: 8, color: '#10B981' },
  ];

  const perfCategoryData: PieSlice[] = [
    { label: 'Mum Lifestyle', value: 6, color: '#7C3AED' },
    { label: 'Nutritionist', value: 2, color: '#3B82F6' },
  ];

  const perfRegionData: PieSlice[] = [
    { label: 'Australia', value: 158123, color: '#F59E0B' },
  ];

  const perfPieData: PieSlice[] = [
    { label: 'mummaloki_', value: 312.23, color: '#7C3AED' },
    { label: 'luamarchi', value: 309.33, color: '#F59E0B' },
    { label: 'nutritionist_stephgeddes', value: 216.42, color: '#10B981' },
    { label: 'valentina_hajast', value: 171.51, color: '#EF4444' },
    { label: 'thesunkissedfolk', value: 165.85, color: '#3B82F6' },
    { label: 'ka_puanani_tia', value: 152.49, color: '#EC4899' },
    { label: 'mama.and.her.beauties', value: 95.65, color: '#8B5CF6' },
    { label: 'bianca.and.bambi', value: 67.23, color: '#06B6D4' },
  ];

  const influencerTableData = [
    { name: 'mummaloki_', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', audience: '34K', mediaValue: '$312.23', engagement: 33, country: 'Australia' },
    { name: 'luamarchi', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', audience: '34.2K', mediaValue: '$309.33', engagement: 7, country: 'Australia' },
    { name: 'nutritionist_stephgeddes', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100', audience: '22.5K', mediaValue: '$216.42', engagement: 71, country: 'Australia' },
    { name: 'valentina_hajast', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=100', audience: '19K', mediaValue: '$171.51', engagement: 4, country: 'Australia' },
    { name: 'thesunkissedfolk', imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100', audience: '17.9K', mediaValue: '$165.85', engagement: 23, country: 'Australia' },
    { name: 'ka_puanani_tia', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100', audience: '15.8K', mediaValue: '$152.49', engagement: 53, country: 'Australia' },
    { name: 'mama.and.her.beauties', imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100', audience: '7.4K', mediaValue: '$95.65', engagement: 144, country: 'Australia' },
    { name: 'bianca.and.bambi', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100', audience: '7.4K', mediaValue: '$67.23', engagement: 3, country: 'Australia' },
  ];

  const monthlyTargets = [
    { country: 'Australia', flag: '🇦🇺', target: 10, confirmed: 0 },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">

      {/* ─── SECTION 1: Campaign Overview ──────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Campaign Overview</h2>
            <p className="text-[13px] text-gray-500 mt-0.5">Track influencer acquisition and pipeline metrics.</p>
          </div>
          <TabGroup items={['Week', 'Month', 'Lifetime', 'Custom']} active={overviewTimeFilter} onChange={setOverviewTimeFilter} size="sm" />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard value="3,300" label="Newly Added" trend="+12%" />
          <StatCard value="53" label="Requested / DM'd" />
          <StatCard value="12" label="Confirmed" />
          <StatCard value="22.64%" label="Conversion Rate" trend="+2.1%" />
        </div>

        {/* Chart + Targets row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Line Chart */}
          <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="text-[13px] font-semibold text-gray-900 mb-4">Influencer Pipeline</h4>
            <AreaLineChart data={lineChartData} />
          </div>

          {/* Monthly Targets */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[13px] font-semibold text-gray-900">Monthly Targets</h4>
              <button className="text-[11px] font-medium text-brand-accent hover:underline">+ Add</button>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-2.5 text-[11px] font-medium text-gray-500">Country</th>
                    <th className="px-3 py-2.5 text-[11px] font-medium text-gray-500 text-center">Target</th>
                    <th className="px-3 py-2.5 text-[11px] font-medium text-gray-500 text-center">Confirmed</th>
                    <th className="px-3 py-2.5 text-[11px] font-medium text-gray-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {monthlyTargets.map((t, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{t.flag}</span>
                          <span className="text-[12px] font-medium text-gray-700">{t.country}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-[12px] font-semibold text-gray-900 text-center">{t.target}</td>
                      <td className="px-3 py-3 text-[12px] font-semibold text-gray-900 text-center">{t.confirmed}</td>
                      <td className="px-3 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors"><PencilSquareIcon className="w-3.5 h-3.5" /></button>
                          <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Breakdown Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <ChartCard title="By Country" data={overviewCountryData} showTable={showCountryTable1} onToggle={() => setShowCountryTable1(!showCountryTable1)} tableColumns={['Country', 'Influencers']} centerLabel="Countries" />
          <ChartCard title="By Category" data={overviewCategoryData} showTable={showCategoryTable1} onToggle={() => setShowCategoryTable1(!showCategoryTable1)} tableColumns={['Category', 'Count']} centerLabel="Categories" />
          <ChartCard title="By Region" data={overviewRegionData} showTable={showRegionTable1} onToggle={() => setShowRegionTable1(!showRegionTable1)} tableColumns={['Region', 'Count']} centerLabel="Regions" />
        </div>

        {/* Status Filter */}
        <div className="flex justify-center">
          <StatusPillGroup active={overviewStatus} onChange={setOverviewStatus} />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* ─── SECTION 2: Campaign Performance ──────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Campaign Performance</h2>
            <p className="text-[13px] text-gray-500 mt-0.5">Content delivery and engagement metrics.</p>
          </div>
          <TabGroup items={['Week', 'Month', 'Lifetime', 'Custom']} active={perfTimeFilter} onChange={setPerfTimeFilter} size="sm" />
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { val: '158.1K', label: 'Impressions' },
            { val: '$1,490.71', label: 'Media Value' },
            { val: '8', label: 'Posts' },
            { val: '8', label: 'Influencers' },
            { val: '296', label: 'Likes' },
            { val: '42', label: 'Comments' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-xl font-semibold text-gray-900">{s.val}</p>
              <p className="text-[11px] font-medium text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Breakdown Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <ChartCard title="By Country" data={perfCountryData} showTable={showCountryTable2} onToggle={() => setShowCountryTable2(!showCountryTable2)} tableColumns={['Country', 'Posts']} centerLabel="Countries" />
          <ChartCard title="By Category" data={perfCategoryData} showTable={showCategoryTable2} onToggle={() => setShowCategoryTable2(!showCategoryTable2)} tableColumns={['Category', 'Posts']} centerLabel="Categories" />
          <ChartCard title="By Region" data={perfRegionData} showTable={showRegionTable2} onToggle={() => setShowRegionTable2(!showRegionTable2)} tableColumns={['Region', 'Impressions']} centerLabel="Regions" />
        </div>

        {/* Status Filter */}
        <div className="flex justify-center">
          <StatusPillGroup active={perfStatus} onChange={setPerfStatus} />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* ─── SECTION 3: Influencer Performance ────────────────────────── */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Influencer Performance</h2>
          <p className="text-[13px] text-gray-500 mt-0.5">Top performing influencers by value, audience, and engagement.</p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <TabGroup items={['Media Value', 'Audience', 'Engagement']} active={perfTab} onChange={setPerfTab} />
          <div className="flex items-center gap-3">
            <select className="bg-white border border-gray-200 rounded-lg py-2 px-3 text-[12px] font-medium text-gray-700 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none cursor-pointer">
              <option>Top 10</option>
              <option>Top 20</option>
              <option>Top 50</option>
            </select>
            <TabGroup items={['Influencer', 'Post']} active={perfView} onChange={setPerfView} size="sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Donut + Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-[13px] font-semibold text-gray-900">Distribution</h4>
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 p-0.5">
                <button onClick={() => setShowPerfPieTable(false)} className={`p-1.5 rounded-md transition-all ${!showPerfPieTable ? 'bg-white shadow-sm text-gray-700' : 'text-gray-400 hover:text-gray-600'}`}>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 3v9l6.36 3.64" /></svg>
                </button>
                <button onClick={() => setShowPerfPieTable(true)} className={`p-1.5 rounded-md transition-all ${showPerfPieTable ? 'bg-white shadow-sm text-gray-700' : 'text-gray-400 hover:text-gray-600'}`}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" d="M3 6h18M3 10h18M3 14h18M3 18h18" /></svg>
                </button>
              </div>
            </div>
            {!showPerfPieTable ? (
              <div className="flex flex-col items-center">
                <DonutChart data={perfPieData} size={200} centerValue="$1,491" centerLabel="Total Value" />
                <ChartLegend data={perfPieData} />
                {/* Selection bar */}
                <div className="mt-5 w-full space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-medium text-gray-500">
                    <span>Selection</span>
                    <span>Remaining</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden bg-gray-100">
                    <div className="bg-brand-accent rounded-full" style={{ width: '100%' }} />
                  </div>
                  <div className="flex items-center justify-between text-[12px] font-semibold text-gray-900">
                    <span>$1,490.71</span>
                    <span className="text-gray-400">$0.00</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2.5 text-[11px] font-medium text-gray-500">Influencer</th>
                      <th className="px-4 py-2.5 text-[11px] font-medium text-gray-500 text-right">Media Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {perfPieData.map((d, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 text-[12px] text-gray-700 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                          {d.label}
                        </td>
                        <td className="px-4 py-2.5 text-[12px] font-medium text-gray-900 text-right">${d.value.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Influencer Table */}
          <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 w-10"></th>
                    <th className="px-4 py-3 text-[11px] font-medium text-gray-500">Influencer</th>
                    <th className="px-4 py-3 text-[11px] font-medium text-gray-500 text-center">Audience</th>
                    <th className="px-4 py-3 text-[11px] font-medium text-gray-500 text-center">Media Value</th>
                    <th className="px-4 py-3 text-[11px] font-medium text-gray-500 text-center">Engagement</th>
                    <th className="px-4 py-3 text-[11px] font-medium text-gray-500 text-center">Country</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {influencerTableData.map((inf, idx) => (
                    <tr key={idx} className="group hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <button className="bg-emerald-500 text-white p-1 rounded-md hover:bg-emerald-600 transition-colors">
                          <PlusIcon className="w-3.5 h-3.5" />
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                            <img src={inf.imageUrl} alt={inf.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] font-medium text-gray-900 group-hover:text-brand-accent transition-colors">{inf.name}</span>
                            <div className="w-3.5 h-3.5 flex-shrink-0 opacity-60"><InstagramIcon /></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-[12px] text-gray-700">{inf.audience}</td>
                      <td className="px-4 py-3 text-center text-[12px] font-semibold text-brand-accent">{inf.mediaValue}</td>
                      <td className="px-4 py-3 text-center text-[12px] text-gray-700">{inf.engagement}</td>
                      <td className="px-4 py-3 text-center text-[12px] text-gray-700">{inf.country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampaignDetailView;
