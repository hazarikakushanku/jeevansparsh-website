"use client";

import { useEffect, useState } from "react";
import { Share2, Film } from "lucide-react";
import { getAllVideos } from "@/lib/videoDB";

export default function Media() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllVideos().then((vids) => {
      setVideos(vids);
      setLoading(false);
    });
  }, []);

  const getVideoSrc = (video) => {
    const blob = new Blob([video.blob], { type: video.mimeType });
    return URL.createObjectURL(blob);
  };

  const handleShare = (video, platform) => {
    const url = window.location.href;
    const text = `Check out this video from Jeevansparsh: ${video.title}`;
    if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "copy") {
      navigator.clipboard.writeText(`${text} ${url}`);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 sm:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-jeevansparsh-blue mb-4">Media Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch our patient success stories, exercise tutorials, and educational content.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl overflow-hidden">
                <div className="w-full aspect-video bg-gray-200" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Film size={56} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-500">No videos available yet.</h3>
            <p className="text-gray-400 text-sm mt-2">Check back soon — content is being added by our team.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group"
              >
                <div className="relative aspect-video bg-black">
                  <video
                    src={getVideoSrc(video)}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    controls
                    preload="metadata"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-jeevansparsh-blue mb-2 line-clamp-1">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">{video.description}</p>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400">Share via</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleShare(video, "whatsapp")}
                        className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors text-xs font-bold"
                        title="WhatsApp"
                      >W</button>
                      <button
                        onClick={() => handleShare(video, "facebook")}
                        className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors text-xs font-bold"
                        title="Facebook"
                      >F</button>
                      <button
                        onClick={() => handleShare(video, "copy")}
                        className="w-8 h-8 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center hover:bg-gray-600 hover:text-white transition-colors"
                        title="Copy Link"
                      ><Share2 size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
