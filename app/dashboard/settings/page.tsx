"use client";

import { useEffect, useState } from "react";

import settingsService from "@/services/settingsService";

export default function SettingsPage() {

    const [settings,setSettings]=useState<any>(null);

    const [password,setPassword]=useState("");

    const [saving,setSaving]=useState(false);

    useEffect(()=>{

        load();

    },[]);

    async function load(){

        const data=
        await settingsService.getSettings();

        setSettings(data);

    }

    async function savePassword(){

        if(password.length<6){

            alert("Password must be at least 6 characters.");

            return;

        }

        setSaving(true);

        try{

            await settingsService.changePassword(password);

            alert("Password updated.");

            setPassword("");

        }finally{

            setSaving(false);

        }

    }

    if(!settings){

        return(

            <div className="flex h-[60vh] items-center justify-center">

                Loading...

            </div>

        );

    }

    return(

        <div className="space-y-8">

            <div className="rounded-3xl border bg-white p-8 shadow-sm">

                <h1 className="text-4xl font-bold">

                    Settings

                </h1>

                <p className="mt-2 text-gray-500">

                    Manage your account settings.

                </p>

            </div>

            <div className="grid gap-8 lg:grid-cols-2">

                <div className="rounded-3xl border bg-white p-8 shadow-sm">

                    <h2 className="text-2xl font-bold">

                        Account

                    </h2>

                    <div className="mt-6 space-y-5">

                        <div>

                            <label>Email</label>

                            <input

                                disabled

                                value={settings.email}

                                className="mt-2 w-full rounded-xl border bg-gray-100 p-4"

                            />

                        </div>

                        <div>

                            <label>

                                Verification

                            </label>

                            <input

                                disabled

                                value={

                                    settings.is_verified

                                    ?"Verified"

                                    :"Not Verified"

                                }

                                className="mt-2 w-full rounded-xl border bg-gray-100 p-4"

                            />

                        </div>

                    </div>

                </div>

                <div className="rounded-3xl border bg-white p-8 shadow-sm">

                    <h2 className="text-2xl font-bold">

                        Security

                    </h2>

                    <div className="mt-6">

                        <label>

                            New Password

                        </label>

                        <input

                            type="password"

                            value={password}

                            onChange={(e)=>setPassword(e.target.value)}

                            className="mt-2 w-full rounded-xl border p-4"

                        />

                    </div>

                    <button

                        onClick={savePassword}

                        disabled={saving}

                        className="mt-6 rounded-xl bg-blue-600 px-8 py-3 text-white"

                    >

                        {

                            saving

                            ?"Saving..."

                            :"Change Password"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}