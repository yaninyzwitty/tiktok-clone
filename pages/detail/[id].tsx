// import React, { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/router";
// import { GoVerified } from "react-icons/go";
// import Image from "next/image";
// import Link from "next/link";
// import { MdOutlineCancel } from "react-icons/md";
// import { BsFillPlayFill } from "react-icons/bs";
// import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

// import Comments from "../../components/Comments";
// import { BASE_URL } from "../../utils";
// import LikeButton from "../../components/LikeButton";
// import useAuthStore from "../../store/authStore";
// import { Video } from "../../types";
// import axios from "axios";

// interface IProps {
//   postDetails: Video;
// }

// const Detail = ({ postDetails }: IProps) => {
//   const [post, setPost] = useState(postDetails);
//   const [isPlaying, setIsPlaying] = useState<boolean>(false);
//   const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
//   const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
//   const [comment, setComment] = useState<string>("");

//   const videoRef = useRef<HTMLVideoElement>(null);
//   const router = useRouter();

//   const { userProfile }: any = useAuthStore();

//   const onVideoClick = () => {
//     if (isPlaying) {
//       videoRef?.current?.pause();
//       setIsPlaying(false);
//     } else {
//       videoRef?.current?.play();
//       setIsPlaying(true);
//     }
//   };

//   useEffect(() => {
//     if (post && videoRef?.current) {
//       videoRef.current.muted = isVideoMuted;
//     }
//   }, [post, isVideoMuted]);

//   const handleLike = async (like: boolean) => {
//     if (userProfile) {
//       const res = await axios.put(`${BASE_URL}/api/like`, {
//         userId: userProfile._id,
//         postId: post._id,
//         like,
//       });
//       setPost({ ...post, likes: res.data.likes });
//     }
//   };

//   const addComment = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();

//     if (userProfile) {
//       if (comment) {
//         setIsPostingComment(true);
//         const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
//           userId: userProfile._id,
//           comment,
//         });

//         setPost({ ...post, comments: res.data.comments });
//         setComment("");
//         setIsPostingComment(false);
//       }
//     }
//   };

//   return (
//     <>
//       {post && (
//         <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
//           <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
//             <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
//               <p className="cursor-pointer " onClick={() => router.back()}>
//                 <MdOutlineCancel className="text-white text-[35px] hover:opacity-90" />
//               </p>
//             </div>
//             <div className="relative">
//               <div className="lg:h-[100vh] h-[60vh]">
//                 <video
//                   ref={videoRef}
//                   onClick={onVideoClick}
//                   loop
//                   src={post?.video?.asset.url}
//                   className=" h-full cursor-pointer"
//                 ></video>
//               </div>

//               <div className="absolute top-[45%] left-[40%]  cursor-pointer">
//                 {!isPlaying && (
//                   <button onClick={onVideoClick}>
//                     <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
//                   </button>
//                 )}
//               </div>
//             </div>
//             <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer">
//               {isVideoMuted ? (
//                 <button onClick={() => setIsVideoMuted(false)}>
//                   <HiVolumeOff className="text-white text-3xl lg:text-4xl" />
//                 </button>
//               ) : (
//                 <button onClick={() => setIsVideoMuted(true)}>
//                   <HiVolumeUp className="text-white text-3xl lg:text-4xl" />
//                 </button>
//               )}
//             </div>
//           </div>
//           <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
//             <div className="lg:mt-20 mt-10">
//               <Link href={`/profile/${post.postedBy._id}`}>
//                 <div className="flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer">
//                   <Image
//                     width={60}
//                     height={60}
//                     alt="user-profile"
//                     className="rounded-full"
//                     src={post.postedBy.image}
//                   />
//                   <div>
//                     <div className="text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center">
//                       {post.postedBy.userName.replace(/\s+/g, "")}{" "}
//                       <GoVerified className="text-blue-400 text-xl" />
//                     </div>
//                     <p className="text-md"> {post.postedBy.userName}</p>
//                   </div>
//                 </div>
//               </Link>
//               <div className="px-10">
//                 <p className=" text-md text-gray-600">{post.caption}</p>
//               </div>
//               <div className="mt-10 px-10">
//                 {userProfile && (
//                   <LikeButton
//                     likes={post.likes}
//                     handleLike={() => handleLike(true)}
//                     handleDislike={() => handleLike(false)}
//                   />
//                 )}
//               </div>
//               <Comments
//                 comment={comment}
//                 setComment={setComment}
//                 addComment={addComment}
//                 comments={post.comments}
//                 isPostingComment={isPostingComment}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export const getServerSideProps = async ({
//   params: { id },
// }: {
//   params: { id: string };
// }) => {
//   const res = await axios.get(`${BASE_URL}/api/post/${id}`);

//   return {
//     props: { postDetails: res.data },
//   };
// };

// export default Detail;

import React, { useState, useEffect, useRef, FormEvent } from "react";
import { BASE_URL } from "../../utils";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill, BsHeartFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { Video } from "../../types";
import useAuthStore from "../../store/authStore";
import Comments from "../../components/Comments";
import LikeButton from "../../components/LikeButton";
type Props = {
  postDetails: Video;
};
function VideoDetailPage({ postDetails }: Props) {
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  // console.log(postDetails);
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  // so as to change post when someonw vlikes it
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();

  if (!post) return null;

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };
  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      // ...put when you want to update
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like, //boolean type
      });
      setPost({
        ...post,
        likes: data.likes,
      });
    }
  };
  const addComment = async (e: FormEvent) => {
    e.preventDefault();
    if (userProfile && comment) {
      setIsPostingComment(true);
      const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });
      setPost({
        ...post,
        comments: res.data.comments,
      });
      setComment("");
      setIsPostingComment(false);
    }
  };

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
        <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer " onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px] hover:opacity-90" />
          </p>
        </div>
      </div>
      <div className="relative ">
        <div className="lg:h-full h-80">
          <video
            ref={videoRef}
            loop
            onClick={() => {}}
            src={post.video.asset.url}
            className="h-full cursor-pointer bg-gray-700"
          ></video>
        </div>
        <div className="absolute top-[45%] left-[45%] cursor-pointer">
          {!playing && (
            <button className="absolute" onClick={onVideoClick}>
              <BsFillPlayFill
                className="text-white text-6xl lg:text-8xl "
                onClick={() => {}}
              />
            </button>
          )}
        </div>
      </div>
      <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10">
        {isVideoMuted ? (
          <button onClick={() => setIsVideoMuted(false)}>
            <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
          </button>
        ) : (
          <button onClick={() => setIsVideoMuted(true)}>
            <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
          </button>
        )}
      </div>
      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-20 mt-10 flex space-x-4 items-center">
          <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
            <Link href={`/profile/${post.postedBy?._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className=" rounded-full"
                  src={post.postedBy?.image}
                  alt="user-profile"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy?._id}`}>
              <div className="flex items-center flex-col gap-2 mt-3">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName}{" "}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
        <p className="mt-5 px-10 text-md text-gray-600 ">{post.caption}</p>
        <div className="mt-[2px]">
          {userProfile && (
            <LikeButton
              handleLike={() => handleLike(true)}
              handleDislike={() => handleLike(false)}
              likes={post.likes}
            />
          )}
        </div>
        <Comments
          comment={comment}
          setComment={setComment}
          addComment={addComment}
          isPostingComment={isPostingComment}
          comments={post.comments}
        />
      </div>
    </div>
  );
}
export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: res.data },
  };
};

export default VideoDetailPage;

// export const getServerSideProps = async ({
//   params: { id },
// }: {
//   params: { id: string };
// }) => {
//   const { data } = await axios.get(`${BASE_URL}/api/post/${id}}`);
//   return {
//     props: {
//       postDetails: data,
//     },
//   };
// };
