import type { FollowerItem, FollowingExport, FollowingItem, AnalysisResult } from '../types/instagram';

const ctx: Worker = self as any;

ctx.onmessage = (e: MessageEvent) => {
  const { type, followersData, followingData } = e.data;

  if (type === 'PROCESS_FILES') {
    try {
      const followersSet = extractFollowers(followersData);
      const followingSet = extractFollowing(followingData);

      const unmatched: string[] = [];
      followingSet.forEach((username) => {
        if (!followersSet.has(username)) {
          unmatched.push(username);
        }
      });

      // Ordine alfabetico per la visualizzazione
      unmatched.sort();

      const payload: AnalysisResult = {
        followersCount: followersSet.size,
        followingCount: followingSet.size,
        unmatchedCount: unmatched.length,
        unmatched,
        followersList: Array.from(followersSet).sort(),
        followingList: Array.from(followingSet).sort(),
      };

      ctx.postMessage({ type: 'SUCCESS', payload });
    } catch (err: any) {
      ctx.postMessage({ type: 'ERROR', error: err.message || 'Errore durante il parsing dei file.' });
    }
  }
};

function extractFollowers(data: unknown): Set<string> {
  const set = new Set<string>();
  if (!Array.isArray(data)) {
    throw new Error('Il file Followers non è un array valido.');
  }

  for (const item of data as FollowerItem[]) {
    if (item.string_list_data && item.string_list_data.length > 0) {
      const val = item.string_list_data[0].value;
      if (val) set.add(val.trim().toLowerCase());
    } else if (item.title) {
      set.add(item.title.trim().toLowerCase());
    }
  }
  return set;
}

function extractFollowing(data: unknown): Set<string> {
  const set = new Set<string>();
  let list: FollowingItem[] = [];

  if (typeof data === 'object' && data !== null && 'relationships_following' in data) {
    list = (data as FollowingExport).relationships_following;
  } else if (Array.isArray(data)) {
    list = data as FollowingItem[];
  } else {
    throw new Error('Il file Following ha un formato non supportato.');
  }

  for (const item of list) {
    // Nel file following.json l'username si trova nel campo `title`
    if (item.title) {
      set.add(item.title.trim().toLowerCase());
    } else if (item.string_list_data && item.string_list_data[0]?.href) {
      // Fallback: estrazione sicura dall'URL se title dovesse mancare
      const parts = item.string_list_data[0].href.split('/');
      const rawUser = parts[parts.length - 1] || parts[parts.length - 2];
      if (rawUser) set.add(rawUser.trim().toLowerCase());
    }
  }
  return set;
}