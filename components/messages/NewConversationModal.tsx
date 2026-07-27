"use client";

import { useEffect, useState } from "react";

import {
    X,
    MessageSquare,
    Loader2
} from "lucide-react";

interface Props{

    open:boolean;

    onClose:()=>void;

    onCreate:(subject:string)=>Promise<void>|void;

}

export default function NewConversationModal({

    open,

    onClose,

    onCreate

}:Props){

    const [subject,setSubject]=useState("");

    const [loading,setLoading]=useState(false);

    useEffect(()=>{

        if(open){

            setSubject("");

        }

    },[open]);

    if(!open) return null;

    async function submit(){

        if(!subject.trim()) return;

        try{

            setLoading(true);

            await onCreate(subject);

            setSubject("");

        }finally{

            setLoading(false);

        }

    }

    return(

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

                <div className="flex items-center justify-between border-b px-8 py-6">

                    <div>

                        <h2 className="text-2xl font-bold">

                            New Conversation

                        </h2>

                        <p className="mt-1 text-gray-500">

                            Start a new discussion with support.

                        </p>

                    </div>

                    <button

                        onClick={onClose}

                        className="rounded-lg p-2 hover:bg-gray-100"

                    >

                        <X size={22}/>

                    </button>

                </div>

                <div className="p-8">

                    <label className="block font-medium">

                        Subject

                    </label>

                    <input

                        value={subject}

                        onChange={(e)=>setSubject(e.target.value)}

                        placeholder="Assignment Revision"

                        className="mt-3 w-full rounded-xl border p-4"

                    />

                    <div className="mt-8 flex justify-end gap-4">

                        <button

                            onClick={onClose}

                            className="rounded-xl border px-6 py-3"

                        >

                            Cancel

                        </button>

                        <button

                            onClick={submit}

                            disabled={loading}

                            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white"

                        >

                            {

                                loading

                                ?

                                <Loader2

                                    className="animate-spin"

                                    size={18}

                                />

                                :

                                <MessageSquare

                                    size={18}

                                />

                            }

                            Create

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}