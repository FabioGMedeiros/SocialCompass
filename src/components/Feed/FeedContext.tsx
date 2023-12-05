import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FeedContextProps {
    posts: { text: string; image: File | null }[];
    addPost: (text: string, image: File | null) => void;
}

const FeedContext = createContext<FeedContextProps | undefined>(undefined);

interface FeedProviderProps {
    children: ReactNode;
}

export const FeedProvider: React.FC<FeedProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<{ text: string; image: File | null }[]>([]);

    const addPost = (text: string, image: File | null) => {
        setPosts((prevPosts) => [...prevPosts, { text, image }]);
    };

    return <FeedContext.Provider value={{ posts, addPost }}>{children}</FeedContext.Provider>;
};

export const useFeed = () => {
    const context = useContext(FeedContext);
    if (!context) {
        throw new Error('useFeed must be used within a FeedProvider');
    }
    return context;
};
