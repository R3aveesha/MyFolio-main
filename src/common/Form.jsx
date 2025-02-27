import React from 'react';
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";

const Form = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [mailError, setMailError] = useState('');

    const form = useRef();
    const resetForm = () => {
        form.current.reset();
    }

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAIL_SERVICE_ID,
                import.meta.env.VITE_EMAIL_TEMPLATE_ID,
                form.current,
                import.meta.env.VITE_PUBLIC_KEY
            )
            .then(
                () => {
                    setShowSuccess(true);
                    setTimeout(() => {
                        setShowSuccess(false);
                    }, 5000);
                    console.log('success')
                },
                (error) => {
                    setMailError(error.text);
                }
            );
        resetForm();
    };

    return (
        <>
            <form ref={form} onSubmit={sendEmail}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-2">
                        <h2 className="text-2xl 2xl:text-5xl font-semibold leading-7">Gmail</h2>
                        <p className="mt-1 text-sm 2xl:text-3xl leading-6">You can send your emails here</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="col-span-full">
                                <label htmlFor="from_name" className="block text-sm 2xl:text-3xl font-medium leading-6">Name</label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-fuchsia-400">
                                        <input type="text" name="from_name" id="from_name" autoComplete="from_name" className="block flex-1 border-0 bg-transparent py-1.5 pl-2 placeholder: focus:ring-0 sm:text-sm 2xl:text-2xl sm:leading-6" placeholder="yourname" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="user_email" className="block text-sm 2xl:text-3xl font-medium leading-6">Email</label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-fuchsia-400">
                                        <input type="email" required name="user_email" id="user_email" autoComplete="user_email" className="block flex-1 border-0 bg-transparent py-1.5 pl-2 placeholder: focus:ring-0 sm:text-sm 2xl:text-2xl sm:leading-6" placeholder="youremail@gmail.com" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="subject" className="block text-sm 2xl:text-3xl font-medium leading-6">Subject</label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-fuchsia-400">
                                        <input required type="text" name="subject" id="subject" autoComplete="subject" className="block flex-1 border-0 bg-transparent py-1.5 pl-2 placeholder: focus:ring-0 sm:text-sm 2xl:text-2xl sm:leading-6" placeholder="Subject" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="message" className="block text-sm 2xl:text-3xl font-medium leading-6">Message</label>
                                <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-fuchsia-400">
                                    <textarea required id="message" name="message" rows="3" className="block w-full rounded-md border-0 py-1.5 px-2 bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 placeholder: focus:ring-2 focus:ring-inset focus:ring-fuchsia-400 sm:text-sm 2xl:text-2xl sm:leading-6" placeholder="Your message"></textarea>
                                </div>
                                {showSuccess && (
                                    <div className='success-response-container items-end pt-2 flex gap-4 text-green-400'>
                                        <p className="mt-1 text-sm 2xl:text-2xl">Mail Sent Successfully</p>
                                        <FaRegCircleCheck className='text-xl 2xl:text-4xl' />
                                    </div>
                                )}

                                {mailError && (
                                    <div className='error-response-container items-end pt-2 flex gap-4 text-red-400'>
                                        <p className="mt-1 text-sm 2xl:text-2xl">{mailError}</p>
                                        <IoIosCloseCircleOutline className='text-xl 2xl:text-4xl' />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-1 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm 2xl:text-3xl font-semibold leading-6" onClick={() => resetForm()}>Cancel</button>
                        <button type="submit" value="Send" className="border-2 border-amber-300 px-5 py-1 text-sm 2xl:text-3xl font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400">Send</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Form;
