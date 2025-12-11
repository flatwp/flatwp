/**
 * GraphQL Fragments for Core Blocks
 * WPGraphQL Content Blocks integration
 */

/**
 * Base block fields that all blocks have
 */
export const BASE_BLOCK_FIELDS = `
  blockName: name
  clientId
  parentClientId
  attributes {
    anchor
    className
    backgroundColor
    textColor
    gradient
  }
`;

/**
 * Paragraph Block Fragment
 */
export const CORE_PARAGRAPH_FRAGMENT = `
  fragment CoreParagraphBlock on CoreParagraph {
    ${BASE_BLOCK_FIELDS}
    attributes {
      content
      dropCap
      fontSize
      align
    }
  }
`;

/**
 * Heading Block Fragment
 */
export const CORE_HEADING_FRAGMENT = `
  fragment CoreHeadingBlock on CoreHeading {
    ${BASE_BLOCK_FIELDS}
    attributes {
      content
      level
      textAlign
      fontSize
    }
  }
`;

/**
 * Quote Block Fragment
 */
export const CORE_QUOTE_FRAGMENT = `
  fragment CoreQuoteBlock on CoreQuote {
    ${BASE_BLOCK_FIELDS}
    attributes {
      value
      citation
      align
      style
    }
  }
`;

/**
 * Code Block Fragment
 */
export const CORE_CODE_FRAGMENT = `
  fragment CoreCodeBlock on CoreCode {
    ${BASE_BLOCK_FIELDS}
    attributes {
      content
      language
      lineNumbers
      showCopyButton
      highlightLines
      fileName
    }
  }
`;

/**
 * Image Block Fragment
 */
export const CORE_IMAGE_FRAGMENT = `
  fragment CoreImageBlock on CoreImage {
    ${BASE_BLOCK_FIELDS}
    attributes {
      url
      alt
      caption
      id
      width
      height
      sizeSlug
      align
      linkDestination
      borderRadius
      aspectRatio
    }
  }
`;

/**
 * Button Block Fragment
 */
export const CORE_BUTTON_FRAGMENT = `
  fragment CoreButtonBlock on CoreButton {
    ${BASE_BLOCK_FIELDS}
    attributes {
      text
      url
      linkTarget
      rel
      variant
      size
      width
      align
    }
  }
`;

/**
 * Buttons Block Fragment (Container)
 */
export const CORE_BUTTONS_FRAGMENT = `
  fragment CoreButtonsBlock on CoreButtons {
    ${BASE_BLOCK_FIELDS}
    attributes {
      align
      verticalAlignment
      layout
    }
    innerBlocks {
      ...CoreButtonBlock
    }
  }
`;

/**
 * Columns Block Fragment
 */
export const CORE_COLUMNS_FRAGMENT = `
  fragment CoreColumnsBlock on CoreColumns {
    ${BASE_BLOCK_FIELDS}
    attributes {
      columns
      verticalAlignment
      isStackedOnMobile
    }
    innerBlocks {
      ...CoreColumnBlock
    }
  }
`;

/**
 * Column Block Fragment (Single column)
 */
export const CORE_COLUMN_FRAGMENT = `
  fragment CoreColumnBlock on CoreColumn {
    ${BASE_BLOCK_FIELDS}
    attributes {
      width
      verticalAlignment
    }
    innerBlocks {
      blockName: name
      attributes
    }
  }
`;

/**
 * Group Block Fragment
 */
export const CORE_GROUP_FRAGMENT = `
  fragment CoreGroupBlock on CoreGroup {
    ${BASE_BLOCK_FIELDS}
    attributes {
      layout
      tagName
    }
    innerBlocks {
      blockName: name
      attributes
    }
  }
`;

/**
 * Separator Block Fragment
 */
export const CORE_SEPARATOR_FRAGMENT = `
  fragment CoreSeparatorBlock on CoreSeparator {
    ${BASE_BLOCK_FIELDS}
    attributes {
      style
      opacity
    }
  }
`;

/**
 * Spacer Block Fragment
 */
export const CORE_SPACER_FRAGMENT = `
  fragment CoreSpacerBlock on CoreSpacer {
    ${BASE_BLOCK_FIELDS}
    attributes {
      height
    }
  }
`;

/**
 * Table Block Fragment
 */
export const CORE_TABLE_FRAGMENT = `
  fragment CoreTableBlock on CoreTable {
    ${BASE_BLOCK_FIELDS}
    attributes {
      body {
        cells {
          content
          tag
        }
      }
      head {
        cells {
          content
          tag
        }
      }
      foot {
        cells {
          content
          tag
        }
      }
      hasFixedLayout
      hasHeader
      hasFooter
      stripes
    }
  }
`;

/**
 * Cover Block Fragment
 */
export const CORE_COVER_FRAGMENT = `
  fragment CoreCoverBlock on CoreCover {
    ${BASE_BLOCK_FIELDS}
    attributes {
      url
      id
      alt
      hasParallax
      dimRatio
      overlayColor
      customOverlayColor
      gradient
      minHeight
      contentPosition
    }
    innerBlocks {
      blockName: name
      attributes
    }
  }
`;

/**
 * Combined query fragment for all core blocks
 */
export const ALL_CORE_BLOCKS_FRAGMENT = `
  ${CORE_PARAGRAPH_FRAGMENT}
  ${CORE_HEADING_FRAGMENT}
  ${CORE_QUOTE_FRAGMENT}
  ${CORE_CODE_FRAGMENT}
  ${CORE_IMAGE_FRAGMENT}
  ${CORE_BUTTON_FRAGMENT}
  ${CORE_BUTTONS_FRAGMENT}
  ${CORE_COLUMNS_FRAGMENT}
  ${CORE_COLUMN_FRAGMENT}
  ${CORE_GROUP_FRAGMENT}
  ${CORE_SEPARATOR_FRAGMENT}
  ${CORE_SPACER_FRAGMENT}
  ${CORE_TABLE_FRAGMENT}
  ${CORE_COVER_FRAGMENT}
`;

/**
 * Example query using editorBlocks field
 */
export const EDITOR_BLOCKS_QUERY = `
  query GetPageWithBlocks($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      title
      editorBlocks(flat: true) {
        ... on CoreParagraph {
          ...CoreParagraphBlock
        }
        ... on CoreHeading {
          ...CoreHeadingBlock
        }
        ... on CoreQuote {
          ...CoreQuoteBlock
        }
        ... on CoreCode {
          ...CoreCodeBlock
        }
        ... on CoreImage {
          ...CoreImageBlock
        }
        ... on CoreButton {
          ...CoreButtonBlock
        }
        ... on CoreButtons {
          ...CoreButtonsBlock
        }
        ... on CoreColumns {
          ...CoreColumnsBlock
        }
        ... on CoreGroup {
          ...CoreGroupBlock
        }
        ... on CoreSeparator {
          ...CoreSeparatorBlock
        }
        ... on CoreSpacer {
          ...CoreSpacerBlock
        }
        ... on CoreTable {
          ...CoreTableBlock
        }
        ... on CoreCover {
          ...CoreCoverBlock
        }
      }
    }
  }

  ${ALL_CORE_BLOCKS_FRAGMENT}
`;
