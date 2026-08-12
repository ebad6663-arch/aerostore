"use client";

import { useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import { createTeamMember } from "@/lib/actions/team";

export default function NewTeamMemberPage() {
  const [images, setImages] = useState<
    {
      url: string;
      publicId: string;
    }[]
  >([]);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white">
          Add Team Member
        </h1>

        <p className="mt-2 text-neutral-400">
          Add founders and team members that will appear on the About page.
        </p>
      </div>

      <form
        action={createTeamMember}
        className="space-y-8 rounded-3xl border border-white/10 bg-[#111111] p-8"
      >
        <input
          type="hidden"
          name="image"
          value={JSON.stringify(images)}
        />

        <ImageUploader
          multiple={false}
          title="Upload Team Member Photo"
          subtitle="Square photo recommended"
          onChange={setImages}
        />

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Full Name
            </label>

            <input
              required
              name="name"
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Position
            </label>

            <input
              required
              name="role"
              placeholder="Founder & CEO"
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Department
            </label>

            <select
              name="department"
              defaultValue="Working Team"
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 text-white"
            >
              <option value="Founding Team">
                Founding Team
              </option>

              <option value="Working Team">
                Working Team
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Display Order
            </label>

            <input
              type="number"
              name="sortOrder"
              defaultValue={0}
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-neutral-300">
              Bio
            </label>

            <textarea
              rows={4}
              name="bio"
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-neutral-300">
              Skills
            </label>

            <input
              name="skills"
              placeholder="Branding, Marketing, Leadership"
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 text-white"
            />

            <p className="mt-2 text-xs text-neutral-500">
              Separate each skill with a comma.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Instagram
            </label>

            <input
              name="instagram"
              placeholder="https://instagram.com/..."
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Facebook
            </label>

            <input
              name="facebook"
              placeholder="https://facebook.com/..."
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-neutral-300">
              LinkedIn
            </label>

            <input
              name="linkedin"
              placeholder="https://linkedin.com/in/..."
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 text-white"
            />
          </div>

          <div className="md:col-span-2 space-y-4">

            <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#1b1b1b] p-4 text-white">
              <input
                type="checkbox"
                name="isFounder"
              />

              Founder
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#1b1b1b] p-4 text-white">
              <input
                type="checkbox"
                defaultChecked
                name="isActive"
              />

              Active
            </label>

          </div>

        </div>

        <div className="flex justify-end">
          <button className="rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600">
            Save Team Member
          </button>
        </div>

      </form>
    </div>
  );
}