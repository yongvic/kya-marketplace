'use client';
import { useRef } from 'react';
import { Post } from "@/lib/types";
import PostCard from "./PostCard";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function PostGrid({ posts }: { posts: Post[] }) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo('.post-card',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 80%',
                }
            }
        );
    }, { scope: container });

    return (
        <div ref={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
                <PostCard key={post.id} post={post} priority={index < 3} />
            ))}
        </div>
    );
}