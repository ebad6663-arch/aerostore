import Link from "next/link";

export default function RegisterPage() {
  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-black
        px-6
        pt-24
      "
    >

      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          p-8
          backdrop-blur-xl
          shadow-2xl
        "
      >

        <div className="mb-8 text-center">

          <h1 className="font-display text-4xl tracking-tight">

            <span className="text-white">
              Aero
            </span>

            <span className="text-orange-500">
              Store
            </span>

          </h1>


          <p className="mt-3 text-sm text-white/50">
            Create your collector account
          </p>

        </div>



        <label className="text-sm text-white/70">
          Full Name
        </label>

        <input
          className="
            mt-2
            h-12
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            text-white
            outline-none
            focus:border-orange-500
          "
        />



        <label className="mt-5 block text-sm text-white/70">
          Email
        </label>

        <input
          type="email"
          className="
            mt-2
            h-12
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            text-white
            outline-none
            focus:border-orange-500
          "
        />



        <label className="mt-5 block text-sm text-white/70">
          Password
        </label>

        <input
          type="password"
          className="
            mt-2
            h-12
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            text-white
            outline-none
            focus:border-orange-500
          "
        />



        <button
          className="
            mt-7
            h-12
            w-full
            rounded-full
            bg-orange-500
            font-medium
            text-black
            hover:bg-orange-400
          "
        >
          Create Account
        </button>



        <p className="mt-7 text-center text-sm text-white/50">

          Already have an account?

          <Link
            href="/login"
            className="
              ml-1
              text-orange-500
            "
          >
            Login
          </Link>

        </p>


      </div>

    </main>
  );
}