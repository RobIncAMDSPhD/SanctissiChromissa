<xsl:stylesheet version="2.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:util="http://whatever"
                xmlns:atom="http://www.w3.org/2005/Atom"
        >
    <xsl:output method="html" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"
                indent="yes"
                encoding="UTF-8"
                doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN"/>


    <xsl:template match="/">
        <head>
            <style type="text/css">
                .rss-container {
                text-align: left;
                margin: 5px;
                overflow-x: auto;
                background-color: none;
                border-width: 1px;
                border-style: solid;
                border-color: #808080;
                border-radius: 1px;
                }
                .rss-head {
                padding: 5px;
                clear: both;
                background-color: #cccccc;
                }
                .rss-head a {
                padding: 0;
                margin: 0;
                }

                .rss-title {
                text-decoration: none;
                font-size: 14px;
                font-family: Arial;
                font-style: normal;
                font-weight: normal;
                color: #4771c1;
                }

                .rss-content {
                }

                .rss-item {
                padding: 5px;
                }
                .item-not-last {
                border-bottom-width: 1px;
                border-bottom-style: SOLID;
                border-bottom-color: #808080;
                }

                .rss-itemtitle {
                padding: 2px 6px;
                font-size: 12px;
                font-family: Arial;
                font-style: italic;
                font-weight: bold;
                background-color: #e6e6e6;
                margin: 0px;
                }

                .rss-itemtitle a {
                padding: 0;
                margin: 0;
                color: #4771c1;
                }

                .rss-item-date {
                padding: 2px 6px;
                margin: 0;
                font-size: 8px;
                font-family: Arial;
                font-style: italic;
                font-weight: normal;
                color: #606060;
                background-color: #f3f3f3;
                }

                .rss-itembody {
                padding: 4px 6px;
                font-size: 11px;
                font-family: Arial;
                font-style: normal;
                font-weight: normal;
                color: #000000;
                background-color: #f3f3f3;
                }
            </style>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        </head>

        <xsl:apply-templates select="rss/channel"/>
        <xsl:apply-templates select="atom:feed"/>
    </xsl:template>

    <!-- RSS Feed handler -->
    <xsl:template match="channel">
        <div class="rss-container">
            <div class="rss-head">
                <xsl:choose>
                    <xsl:when test="link">
                        <a class="rss-title" href="{normalize-space(link)}" newtab="true">
                            <xsl:choose>
                                <xsl:when test="string-length('Quod Ore Sumpsimus...') = 0">
                                    <xsl:value-of select="title"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    Quod Ore Sumpsimus...
                                </xsl:otherwise>
                            </xsl:choose>
                        </a>
                    </xsl:when>
                    <xsl:otherwise>
                        <p>
                            <xsl:choose>
                                <xsl:when test="string-length('Quod Ore Sumpsimus...') = 0">
                                    <xsl:value-of select="title"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    Quod Ore Sumpsimus...
                                </xsl:otherwise>
                            </xsl:choose>
                        </p>
                    </xsl:otherwise>
                </xsl:choose>
            </div>
            <div class="rss-content">
                <xsl:for-each select="item[position()&lt;=2]">
                    <xsl:choose>
                        <xsl:when test="position() &lt;= 1">
                            <xsl:choose>
                                <xsl:when test="position() != last()">
                                    <xsl:text
                                            disable-output-escaping="yes">&lt;div class="rss-item item-not-last"&gt;</xsl:text>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:text disable-output-escaping="yes">&lt;div class="rss-item"&gt;</xsl:text>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:text disable-output-escaping="yes">&lt;div class="rss-item"&gt;</xsl:text>
                        </xsl:otherwise>
                    </xsl:choose>

                    <p class="rss-itemtitle">
                        <xsl:choose>
                            <xsl:when test="0 = 0">
                                <a href="{normalize-space(link)}" newtab="true">
                                    <xsl:value-of select="title"/>
                                </a>
                            </xsl:when>
                            <xsl:otherwise>
                                <a href="{normalize-space(link)}" newtab="true">
                                    <xsl:value-of select="substring(title, 1, 0)"/>
                                    <xsl:if test="string-length(title) &gt; 0">
                                        ...
                                    </xsl:if>
                                </a>
                            </xsl:otherwise>
                        </xsl:choose>
                    </p>

                    <xsl:if test="1 = 1">
                        <p class="rss-item-date">
                            <xsl:value-of select="pubDate"/>
                        </p>
                    </xsl:if>

                    <div class="rss-itembody">
                        <xsl:choose>
                            <xsl:when test="250 = 0">
                                <xsl:value-of disable-output-escaping="yes"
                                              select="description"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of disable-output-escaping="yes"
                                              select="substring(description, 1, 250)"/>

                                <xsl:if test="string-length(truncatedDesc) &gt; 250">
                                    ...
                                </xsl:if>

                            </xsl:otherwise>
                        </xsl:choose>
                    </div>
                    <xsl:text disable-output-escaping="yes">&lt;/div&gt;</xsl:text>
                </xsl:for-each>
            </div>
        </div>
    </xsl:template>


    <!-- Atom Feed handler -->
    <xsl:template match="atom:feed">
        <div class="rss-container">
            <div class="rss-head">
                <xsl:choose>
                    <xsl:when test="atom:link">
                        <a class="rss-title" href="{normalize-space(atom:link/@href)}" newtab="true">
                            <xsl:choose>
                                <xsl:when test="string-length('Quod Ore Sumpsimus...') = 0">
                                    <xsl:value-of select="atom:title"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    Quod Ore Sumpsimus...
                                </xsl:otherwise>
                            </xsl:choose>
                        </a>
                    </xsl:when>
                    <xsl:otherwise>
                        <p>
                            <xsl:choose>
                                <xsl:when test="string-length('Quod Ore Sumpsimus...') = 0">
                                    <xsl:value-of select="atom:title"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    Quod Ore Sumpsimus...
                                </xsl:otherwise>
                            </xsl:choose>
                        </p>
                    </xsl:otherwise>
                </xsl:choose>
            </div>
            <div class="rss-content">
                <xsl:for-each select="atom:entry[position()&lt;=2]">
                    <xsl:choose>
                        <xsl:when test="position() &lt;= 1">
                            <xsl:choose>
                                <xsl:when test="position() != last()">
                                    <xsl:text
                                            disable-output-escaping="yes">&lt;div class="rss-item item-not-last"&gt;</xsl:text>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:text disable-output-escaping="yes">&lt;div class="rss-item"&gt;</xsl:text>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:text disable-output-escaping="yes">&lt;div class="rss-item"&gt;</xsl:text>
                        </xsl:otherwise>
                    </xsl:choose>

                    <p class="rss-itemtitle">
                        <xsl:choose>
                            <xsl:when test="0 = 0">
                                <a href="{normalize-space(atom:link/@href)}" newtab="true">
                                    <xsl:value-of select="atom:title"/>
                                </a>
                            </xsl:when>
                            <xsl:otherwise>
                                <a href="{normalize-space(atom:link/@href)}" newtab="true">
                                    <xsl:value-of select="substring(atom:title, 1, 0)"/>
                                    <xsl:if test="string-length(atom:title) &gt; 0">
                                        ...
                                    </xsl:if>
                                </a>
                            </xsl:otherwise>
                        </xsl:choose>
                    </p>
                    <xsl:if test="true = true">
                        <xsl:if test="count(atom:published) &gt; 0">
                            <p class="rss-item-date">
                                <xsl:value-of select="atom:published"/>
                            </p>
                        </xsl:if>
                    </xsl:if>
                    <div class="rss-itembody">
                        <xsl:choose>
                            <xsl:when test="250 = 0">
                                <xsl:value-of disable-output-escaping="yes"
                                              select="atom:content"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of disable-output-escaping="yes"
                                              select="substring(atom:content, 1, 250)"/>
                                <xsl:if test="string-length(truncatedDesc) &gt; 250">
                                    ...
                                </xsl:if>
                            </xsl:otherwise>
                        </xsl:choose>
                    </div>
                    <xsl:text disable-output-escaping="yes">&lt;/div&gt;</xsl:text>
                </xsl:for-each>
            </div>
        </div>
    </xsl:template>
</xsl:stylesheet>