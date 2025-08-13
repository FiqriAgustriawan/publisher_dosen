import React from 'react';
import { FiClock } from 'react-icons/fi';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface CommentProps {
  comments: {
    id: number;
    nama: string;
    email: string;
    komentar: string;
    created_at: string;
  }[];
}

export default function CommentList({ comments }: CommentProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-10 border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">
          Belum ada komentar. Jadilah yang pertama berkomentar!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-6">
      <h3 className="text-xl font-bold">Komentar ({comments.length})</h3>

      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-start space-x-4">
            <Avatar className="h-10 w-10 bg-green-100 dark:bg-green-900/30">
              <AvatarFallback className="text-green-700 dark:text-green-400">
                {comment.nama.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  {comment.nama}
                </h4>

                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                  <FiClock className="mr-1" />
                  <time dateTime={comment.created_at}>
                    {new Date(comment.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              </div>

              <div className="prose dark:prose-invert prose-sm max-w-none mt-2"
                dangerouslySetInnerHTML={{ __html: comment.komentar }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}