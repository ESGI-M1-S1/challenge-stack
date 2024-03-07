'use client';
import { Form } from "@/components/ui/form";
import { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";



export default function Exams() {

    return (

            <div className={"container"}>
            <header className={"pt-5 w-full flex justify-between"}>
            <h1 className={"text-4xl font-bold"}>Quizz</h1>
                <div className={"h-full flex "}>
                    <Link href={"/exams/new"}>
                        <Button>
                            <Label>Add a Quizz</Label>
                        </Button>
                    </Link>
                    </div>
                </header>
            </div>
            );
}