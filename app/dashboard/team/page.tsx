import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import {
  Plus,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

import { deleteTeamMember } from "@/lib/actions/team";

export default async function TeamPage() {
  const members = await prisma.teamMember.findMany({
orderBy:[
{
isFounder:"desc",
},
{
sortOrder:"asc",
}
]
});

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
            Content Management
          </p>

          <h1 className="mt-2 text-4xl font-black text-white">
            Team Members
          </h1>

          <p className="mt-2 text-neutral-400">
            Manage founders and your team.
          </p>
        </div>

        <Link
          href="/dashboard/team/new"
          className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-400"
        >
          <Plus size={18} />
          Add Member
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">

        {members.length === 0 ? (

          <div className="py-24 text-center">

            <Users
              size={54}
              className="mx-auto mb-6 text-neutral-600"
            />

            <h2 className="text-2xl font-bold text-white">
              No Team Members
            </h2>

            <p className="mt-3 text-neutral-500">
              Add your founder and team members.
            </p>

          </div>

        ) : (

          <table className="w-full">

            <thead className="border-b border-white/10 bg-[#181818]">

              <tr className="text-left text-xs uppercase tracking-wider text-neutral-500">

                <th className="px-6 py-5">
                  Member
                </th>

                <th className="px-6 py-5">
                  Role
                </th>

                <th className="px-6 py-5">
                  Founder
                </th>

                <th className="px-6 py-5 text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {members.map((member) => (

                <tr
                  key={member.id}
                  className="border-b border-white/5"
                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <div className="relative h-14 w-14 overflow-hidden rounded-full bg-neutral-800">

                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />

                      </div>

                      <div>

                        <h3 className="font-bold text-white">
                          {member.name}
                        </h3>

                        <p className="text-sm text-neutral-500">
                          {member.bio}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-5 text-neutral-300">
                    {member.role}
                  </td>

                  <td className="px-6 py-5">

                    {member.isFounder ? (
                      <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-bold text-orange-400">
                        Founder
                      </span>
                    ) : (
                      "-"
                    )}

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-end gap-3">

                      <Link
                        href={`/dashboard/team/${member.id}/edit`}
                        className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-2 text-blue-400"
                      >
                        <Pencil size={18} />
                      </Link>

                      <form
  action={deleteTeamMember.bind(
    null,
    member.id
  )}
>
  <button
    type="submit"
    className="rounded-xl border border-red-500/20 bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500 hover:text-white"
  >
    <Trash2 size={18} />
  </button>
</form>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>
    </div>
  );
}