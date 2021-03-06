module.exports = {
  title_edit: "Edit Problem",
  title_new: "New Problem",
  header_edit: "Edit Problem {idString}",
  header_new: "New Problem",
  back_to_problem: "Back",
  confirm_back_to_problem: "Discard Changes and Back",
  submit: "Submit",
  no_submit_permission: "No Permission",
  submit_success: "Successfully submitted.",
  submit_error: {
    create: {
      FAILED: "Failed to create new problem due to unknown error.",
      PERMISSION_DENIED: "Permission denied."
    },
    update: {
      FAILED: "Failed to update problem due to unknown error.",
      NO_SUCH_PROBLEM: "No such problem.",
      PERMISSION_DENIED: "Permission denied."
    }
  },
  header_samples: "Samples",
  header_tags: "Tags",
  tags_placeholder: "Search tags to add ...",
  no_addable_tags: "No tags to add.",
  content_editor: {
    title: "Title",
    preview_all: "Preview",
    default: "Default language",
    confirm_apply_template: "Confirm apply template",
    confirm_delete: "Confirm delete language",
    section_title: "Section Title",
    preview: "Preview",
    add_section: {
      before_this_section: "Before this section",
      after_this_section: "After this section"
    },
    section_content: "Section Content",
    new_sample: "New Sample",
    sample_input: "Input",
    sample_output: "Output",
    sample_explanation: "Explanation",
    section_options: {
      move_up: "Move Up",
      move_down: "Move Down",
      delete: "Delete",
      confirm_delete: "Confirm Delete"
    },
    section_type: {
      text: "Text",
      sample: "Sample"
    }
  },
  sample_editor: {
    add_sample_when_empty: "Add Sample",
    sample_id: "Sample ID",
    warning: {
      not_referenced: 'Not referenced in language "{language}"',
      multiple_references: 'Referenced {referenceCount} times in language "{language}"'
    },
    add_sample: {
      before_this_sample: "Before this sample",
      after_this_sample: "After this sample"
    },
    options: {
      move_up: "Move Up",
      move_down: "Move Down",
      delete: "Delete",
      confirm_delete: "Confirm Delete"
    }
  }
};
