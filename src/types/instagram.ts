// Struttura Followers JSON
export interface FollowerItem {
  title: string;
  media_list_data: unknown[];
  string_list_data: Array<{
    href: string;
    value: string;
    timestamp: number;
  }>;
}

// Struttura Following JSON
export interface FollowingItem {
  title: string;
  string_list_data: Array<{
    href: string;
    timestamp: number;
  }>;
}

export interface FollowingExport {
  relationships_following: FollowingItem[];
}

export interface AnalysisResult {
  followersCount: number;
  followingCount: number;
  unmatchedCount: number;
  unmatched: string[];
  followersList: string[];
  followingList: string[];
}

export type ParseWorkerMessage = 
  | { type: 'PROCESS_FILES'; followersData: unknown; followingData: unknown }
  | { type: 'SUCCESS'; payload: AnalysisResult }
  | { type: 'ERROR'; error: string };